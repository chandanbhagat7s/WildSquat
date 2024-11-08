const Razorpay = require("razorpay");
const Booked = require("../Models/BookedProduct");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
const redisClient = require("../Redis/redisClient");



exports.checkForExpressBeeMiddlewareAvaibility = catchAsync(async (req, res, next) => {

    const r = await axios.post("https://shipment.xpressbees.com/api/courier/serviceability", {

        origin: "500016",
        destination: req.user.pinCode,
        payment_type: "prepaid",
        order_amount: "999",
        weight: "400",
        length: "30",
        breadth: "20",
        height: "2"

    }, {
        headers: {

            'Authorization': `Bearer ${req.expressToken}` // Authorization header with Bearer token
        }
    })

    if (r?.data?.status) {
        let courersOption = r?.data?.data;

        if (courersOption.length > 0) {
            let obj = courersOption.reduce((lowest, shipment) => {
                return shipment?.total_charges < lowest.total_charges ? shipment : lowest;
            });

            req.courier = obj;
            req.expressBee = true;
        }
    }

    next()
})



exports.ensureShippingAuth = catchAsync(async (req, res, next) => {

    let token = await redisClient.get("token");
    let expressToken = await redisClient.get("expressToken");

    if (token) {
        token = JSON.parse(token).data.token
    }
    if (expressToken) {
        expressToken = JSON.parse(expressToken);

    }

    if (!expressToken) {
        const secondresponse = await axios.post("https://shipment.xpressbees.com/api/users/login", {
            email: process.env.EXPRESS_SHIPEMAIL,
            password: process.env.EXPRESS_SHIPPASS
        })



        const expData = secondresponse?.data?.data || ""



        await redisClient.set("expressToken", JSON.stringify(expData), {
            EX: 5 * 3600
        });
        expressToken = expData;
        req.expressToken = expData;

    }

    if (!token) {


        // Making the POST request with fetch
        const response = await fetch('https://api.bigship.in/api/login/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: process.env.SHIP_USERNAME,
                password: process.env.SHIP_PASSWORD,
                access_key: process.env.SHIP_ACCESS_KEY // Add access_key as required
            })
        });



        // Handle non-OK responses
        if (!response.ok) {
            next(new appError("something went wrong please try again later", 500));
        }

        const data = await response.json();
        token = data?.data?.token;

        await redisClient.set("token", JSON.stringify(data), {
            EX: 11 * 3600  // Cache expires in 11 hour
        });



        req.shippingToken = data?.data?.token;

    }

    req.shippingToken = token;
    req.expressToken = expressToken;


    next(); // Proceed to the next middleware or route handler
});


exports.tryExpressBee = catchAsync(async (req, res, next) => {
    try {


        const { orderId } = req.body;


        if (!orderId) {
            return next(new appError("Order id not created, please pass OrderId", 400));
        }

        // get the details of user form order id 
        const order = await Booked.findById(orderId).populate("byuser")
        order.phase = 0;
        if (!order) {
            return next(new appError("please validate order Id", 400))
        }

        let calculation = {
            lengthh: 0,
            breadth: 0,
            height: 0,
            weight: 0,
            price: 0,

        }

        let orderDetails = order?.productData?.map((el) => {


            let dim = el.dimension[0].split(",");
            let l = dim[0] * 1, b = dim[1] * 1, h = dim[2] * 1;
            calculation = { ...calculation, lengthh: calculation.lengthh < l ? l : calculation.lengthh, breadth: calculation.breadth < b ? b : calculation.breadth, height: calculation.height + h, weight: calculation.weight + el.weight, price: calculation.price + el.price * el.quantity }
            let obj = {
                "name": el.name,
                "qty": el.quantity,
                "price": el.price * el.quantity,
                "sku": ""
            }
            return obj;

        })

        let courerDetails = req.courier;

        if (!courerDetails.id) {
            next()
        }



        let shipmentDetails = {
            "order_number": `${Date.now()}`,
            "unique_order_number": "yes",
            "shipping_charges": 40,
            "discount": 0,
            "cod_charges": 0,
            "payment_type": "prepaid",
            "order_amount": calculation.price,
            "package_weight": calculation.weight * 1000,
            "package_length": calculation.lengthh * 1,
            "package_breadth": calculation.breadth * 1,
            "package_height": calculation.height * 1,
            "request_auto_pickup": "yes",
            "consignee": {
                "name": `${order?.byuser?.name}`,
                "address": order?.byuser?.addressLine1,
                "address_2": `${order?.byuser?.addressLine2 || "      "}`,
                "city": order?.byuser?.city || "pune",
                "state": order?.byuser?.state,
                "pincode": order?.byuser?.pinCode,
                "phone": `${order?.byuser?.mobile}`
            },
            "pickup": {
                "warehouse_name": "Wildsquat down1",
                "name": "WILD SQUAT",
                "address": "WILD SQUAT, BEARING NO : 2-3-168, SHOP NO 1, GROUND FLOOR, RAMGOPAL PET, NALLAGUTTA, NALLAGUTTA MASJID ROAD, OPPOSITE BNR TRANSPORT.,  India, ",
                "address_2": "Near metro station",
                "city": "HYDERABAD",
                "state": "telangana",
                "pincode": "500016",
                "phone": "8686416102"
            },
            "order_items": [
                ...orderDetails
            ],
            "courier_id": courerDetails.id,
            "collectable_amount": "0"
        }

        const shippingpart1 = await axios.post("https://shipment.xpressbees.com/api/shipments2", shipmentDetails, {
            headers: {

                'Authorization': `Bearer ${req.expressToken}` // Authorization header with Bearer token
            }
        });


        if (shippingpart1?.data?.status) {


            order.courier_id = courerDetails.id;
            order.charges = courerDetails.total_charges;
            order.courier_name = shippingpart1.data?.data?.courier_name;
            order.master_awb = shippingpart1.data?.data?.awb_number;
            order.ordredPlaced = true;
            order.phase = 3
            order.platform = "expressbee"
            order.orderStatus = "Booked"
            order.statusUpdatedAt = Date.now()
            await order.save()

            res.status(200).send({
                status: "success",
                data: "done"
            })
            return;
        }

        next()



    } catch (e) {

        next()
    }


})

exports.shipProduct = catchAsync(async (req, res, next) => {
    // we are requesting thirdpatry api so in case of shipping we are storing it in db 
    try {


        const { orderId } = req.body;
        const token = req.shippingToken;


        if (!orderId) {
            return next(new appError("Order id not created, please pass OrderId", 400));
        }

        // get the details of user form order id 
        const order = await Booked.findById(orderId).populate("byuser")
        order.phase = 0;
        if (!order) {
            return next(new appError("please validate order Id", 400))
        }

        let calculation = {
            lengthh: 0,
            breadth: 0,
            height: 0,
            weight: 0,
            price: 0,

        }

        let orderDetails = order.productData.map((el) => {


            let dim = el.dimension[0].split(",");
            let l = dim[0] * 1, b = dim[1] * 1, h = dim[2] * 1;
            calculation = { ...calculation, lengthh: calculation.lengthh < l ? l : calculation.lengthh, breadth: calculation.breadth < b ? b : calculation.breadth, height: calculation.height + h, weight: calculation.weight + el.weight, price: calculation.price + el.price * el.quantity }
            let obj = {
                "product_category": "FashionClothing",
                "product_sub_category": "",
                "product_name": el.name,
                "product_quantity": el.quantity,
                "each_product_invoice_amount": el.price * el.quantity,
                "each_product_collectable_amount": order?.type == "Prepaid" ? 0 : el.price * el.quantity / 10,
                "hsn": ""
            }
            return obj

        })




        const d = new Date()
        let orderInvoiceId = Date.now()

        const shippingDetails = {
            "shipment_category": "b2c",
            "warehouse_detail": {
                "pickup_location_id": order?.productData[0]?.stockPlace || 122222,
                "return_location_id": order?.productData[0]?.stockPlace || 122222
            },
            "consignee_detail": {
                "first_name": order?.byuser?.name,
                "last_name": order?.byuser?.name,
                "company_name": "",
                "contact_number_primary": `${order?.byuser?.mobile}`,
                "contact_number_secondary": "",
                "email_id": "",
                "consignee_address": {
                    "address_line1": `${order?.byuser?.addressLine1.substr(0, 48)}`,
                    "address_line2": `${order?.byuser?.addressLine2 || `${order?.byuser?.state}`}`,
                    "address_landmark": "",
                    "pincode": `${order.byuser.pinCode}`
                }
            },
            "order_detail": {
                "invoice_date": d.toUTCString(Date.now()),
                "invoice_id": `${orderInvoiceId}`,
                "payment_type": order?.type || "COD",
                "shipment_invoice_amount": calculation.price,
                "total_collectable_amount": order?.type == "Prepaid" ? 0 : calculation.price / 10,
                "box_details": [
                    {
                        "each_box_dead_weight": calculation.weight,
                        "each_box_length": calculation.lengthh || 20,
                        "each_box_width": calculation.breadth || 15,
                        "each_box_height": calculation.height || 2,
                        "each_box_invoice_amount": calculation.price,
                        "each_box_collectable_amount": order?.type == "Prepaid" ? 0 : calculation.price / 10,
                        "box_count": 1,
                        "product_details": [
                            ...orderDetails
                        ]
                    }
                ],
                "ewaybill_number": "",
                "document_detail": {
                    "invoice_document_file": "",
                    "ewaybill_document_file": ""
                }
            }
        }

        order.shipOrderId = orderInvoiceId;

        // creating system id of order
        const shippingpart1 = await axios.post("https://api.bigship.in/api/order/add/single", shippingDetails, {
            headers: {

                'Authorization': `Bearer ${token}` // Authorization header with Bearer token
            }
        });

        if (!shippingpart1?.data?.success) {
            await order.save()
            res.status(200).send({
                status: "success",
                data: "done"
            })
            return
        }

        // if (condition) {

        // }



        // "system_order_id is 1002443475" , now further manifasting it 

        let systemId = shippingpart1?.data?.data
        systemId = systemId.length > 0 ? systemId.split(" ") : false
        systemId = systemId[systemId.length - 1]


        if (systemId) {
            order.system_order_id = systemId;

            // we will now fetch all the courier id and then form that mimium one will be seleted




            const fetchCoriers = await axios.get(`https://appapinew.bigship.in/api/OrderShipment/Servicibility/CourierList/6393440/${systemId}`, {
                headers: {

                    'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                }
            });

            // if (!fetchCoriers?.data?.success) {
            //     order.phase = 1
            //     await order.save();

            //     res.status(200).send({
            //         status: "success",
            //         data: "done"
            //     })
            //     return
            // }

            // if (fetchCoriers?.data?.data?.length == 0) {
            //     order.phase = 1
            //     await order.save()
            //     res.status(200).send({
            //         status: "success",
            //         data: "done"
            //     })
            //     return
            // }




            const lowestChargeCourier = fetchCoriers?.data?.data?.reduce((prev, current) => {
                return (prev.courierCharge < current.courierCharge) ? prev : current;
            });




            const shippingpart2 = await axios.post("https://api.bigship.in/api/order/manifest/single", {
                "system_order_id": systemId,
                "courier_id": lowestChargeCourier.courierId
            }
                , {
                    headers: {

                        'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                    }
                });

            // now we are getting awb and other details
            if (!shippingpart2?.data?.success) {
                order.phase = 1;


                order.orderStatus = "Booked"
                order.statusUpdatedAt = Date.now()
                await order.save()
                res.status(200).send({
                    status: "success",
                    data: "done"
                })
                return
            }



            const final = await axios.post(`https://api.bigship.in/api/shipment/data?shipment_data_id=1&system_order_id=${systemId}`, {

            }
                , {
                    headers: {

                        'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                    }
                });

            if (!final?.data?.success) {
                order.phase = 2;


                order.orderStatus = "Booked"
                order.statusUpdatedAt = Date.now()
                order.shipOrderId = systemId
                await order.save()
                res.status(200).send({
                    status: "success",
                    data: "done"
                })
                return
            }



            /*
            data is  {
data: 'system_order_id is 1002443557',
success: true,
message: 'Order Added Successfully !!!',
responseCode: 200
}
menifistingby 1002443557
pase2 is  {
data: null,
success: true,
message: 'Successfully Waybill Generated',
responseCode: 200
} {
data: {
courier_id: '24',
courier_name: 'Amazon 0.5Kg',
lr_number: null,
master_awb: '344251253229'
},
success: true,
message: 'Successfully Completed',
responseCode: 200
}
            */
            order.system_order_id = systemId;
            order.courier_id = lowestChargeCourier.courierId;
            order.charges = lowestChargeCourier.courierCharge;
            order.courier_name = final.data?.data?.courier_name
            order.master_awb = final.data?.data?.master_awb
            order.ordredPlaced = true;
            order.phase = 3;

            order.orderStatus = "Booked"
            order.statusUpdatedAt = Date.now()

            order.platform = "bigship"

            await order.save()

            res.status(200).send({
                status: "success",
                data: "done"
            })
            return
        }



        next(new appError("Please try again", 400))


    } catch (e) {


        res.status(400).send({
            status: "fail",
            data: "done"
        })
    }



})

exports.getAllWarehouse = catchAsync(async (req, res, next) => {
    try {


        const token = req.shippingToken;

        const getAllWarehouse = await axios.get("https://appapinew.bigship.in/api/wms/location/get/6393440/1/10?status=true", {
            headers: {
                'Authorization': `Bearer ${token}` // Authorization header with Bearer token
            }
        })


        res.status(200).send({
            status: "success",
            warehouse: getAllWarehouse?.data?.data?.resData || []
        })
    } catch (e) {

        res.status(400).send({
            status: "fail",
            msg: "something went wrong"
        })
    }
})



exports.cancleShpementAndRefund = catchAsync(async (req, res, next) => {
    const { orderId } = req.body;
    if (!orderId) {
        return next(new appError("please pass orderId to process refund", 400))
    }

    const order = await Booked.findById(orderId).populate("byuser")

    if (!order) {
        return next(new appError("You have not booked any order", 400))
    }
    if (order.cancledShipment) {
        return next(new appError("Your order is cancled already", 400))
    }
    // if (order.refunded) {
    //     return next(new appError("Your amount has been refunded already", 400))
    // }
    // first cancle order  


    // get orderstatus 
    let response;
    let now = Date.now();
    if (order.platform == "bigship") {
        // Make the API request
        response = await axios.get(
            `https://appapinew.bigship.in/api/Dashboard/GetShipmentDetails?user_Id=6393440&search_key=order_id&search_value=${order.shipOrderId}`,
            {
                headers: {
                    Authorization: `Bearer ${req.shippingToken}`, // Authorization header with Bearer token
                },
            }
        );



        const shipmentInfo = response.data?.data?.shipmentInfo;


        // Update the status and the timestamp in the database
        order.orderStatus = shipmentInfo.orderStatus;
        order.statusUpdatedAt = now;
        order.fetch = false;
    } else if (order.platform == "expressbee") {
        // Track Shipment

        response = await axios.get(
            `https://shipment.xpressbees.com/api/shipments2/track/${order.master_awb}`,
            {
                headers: {
                    Authorization: `Bearer ${req.expressToken}`, // Authorization header with Bearer token
                },
            }
        );

        let shipmentInfo = response.data.data;


        order.orderStatus = shipmentInfo.status;
        order.statusUpdatedAt = now;

    } else {

    }


    try {
        if (order.platform == "bigship") {

            const cancledShipment = await axios.put("https://api.bigship.in/api/order/cancel", [
                order.master_awb
            ]
                , {
                    headers: {

                        'Authorization': `Bearer ${req.shippingToken}` // Authorization header with Bearer token
                    }
                });




            if (!cancledShipment?.data?.success) {

                await order.save()
                return next(new appError("Something went wrong please try again to cancle your order", 400))

            }
        } else if (order.platform == "expressbee") {


            const cancledShipment = await axios.post("https://shipment.xpressbees.com/api/shipments2/cancel", {
                "awb": order.master_awb
            }
                , {
                    headers: {

                        'Authorization': `Bearer ${req.expressToken}` // Authorization header with Bearer token
                    }
                });




            if (!cancledShipment?.data?.status) {
                await order.save()
                return next(new appError("Something went wrong please try again to cancle your order", 400))

            }
        } else {
            order.phase = 3;
            order.orderStatus = "Cancelled"
            order.cancledShipment = true;
            order.statusUpdatedAt = now;
        }
    } catch (e) {
        return next(new appError("Something went wrong please try again to cancle your order", 400))
    }



    order.cancledShipment = true;
    order.fetch = true;


    // if order is delivered then only we need to ship return 



    if (order.orderStatus == "Delivered" || order.orderStatus == "delivered") {
        // now we need to make the return order
        let reverseShipmentBody = {
            order_id: Date.now(),
            request_auto_pickup: "yes",
            consignee: {
                name: `${order.byuser.name.slice(0, 18)}`,
                address: `${order.byuser.addressLine1}`,
                address_2: `${order?.byuser?.addressLine2 || `${order?.byuser?.state}`}`,
                city: ` ${order.byuser.city}`,
                state: ` ${order.byuser.state}`,
                pincode: `${order.byuser.pinCode}`,
                phone: `${order.byuser.mobile}`,
                alternate_phone: `${order.byuser.mobile}`
            },

            pickup: {
                warehouse_name: "Wildsquat return",
                name: "WildSquat Down",
                address: "WILD SQUAT, BEARING NO : 2-3-168, SHOP NO 1, GROUND FLOOR, RAMGOPAL PET, NALLAGUTTA, NALLAGUTTA MASJID ROAD, OPPOSITE BNR TRANSPORT.,  India,",
                address_2: "Near metro station",
                city: "HYDERABAD",
                state: "telangana",
                pincode: "500016",
                phone: "8686416102"
            },
            categories: "Mens Fashion",
            product_name: "trial pants 2",
            product_qty: "1",
            product_amount: "10",
            package_weight: 500,
            package_length: "20",
            package_breadth: "15",
            package_height: "2",
            qccheck: "1",
            uploadedimage: "https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80",
            uploadedimage_2: "",
            uploadedimage_3: "",
            uploadedimage_4: "",
            product_usage: "1",
            product_damage: "1",
            brandname: "wildsquat",
            brandnametype: "Fashion",
            productsize: "1",
            productsizetype: "10",
            productcolor: "1",
            productcolourtype: "Red"
        }
        try {
            let reversebookingres = await axios.post("https://shipment.xpressbees.com/api/reverseshipments", reverseShipmentBody
                , {
                    headers: {

                        'Authorization': `Bearer ${req.expressToken}` // Authorization header with Bearer token
                    }
                });

            let shipmentInfo = reversebookingres.data?.data;
            order.reverseBooking = true;
            order.reverseAWB = shipmentInfo?.awb_number;
            order.reverseShipmentId = shipmentInfo?.shipment_id;
            order.reverseOrderId = shipmentInfo?.order_id;
        } catch (e) {

            order.reverseBooking = false;

        }
    }




    const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;



    var instance = new Razorpay({
        key_id: RAZORPAY_ID_KEY,
        key_secret: RAZORPAY_SECRET_KEY
    })

    let responce = instance.payments.refund(order.paymentId, {
        "amount": "100",
        "speed": "normal",
        "notes": {
            "notes_key_1": "Beam me up Scotty.",
            "notes_key_2": "Engage"
        },
        "receipt": `Receipt No. ${order.orderId}`
    })
    const r = await responce;
    order.refunded = true
    await order.save();
    // await Booked.findByIdAndDelete(order._id)
    res.status(200).send({
        status: "success"
    })
})



exports.shipProductByAdmin = catchAsync(async (req, res, next) => {
    // we are requesting thirdpatry api so in case of shipping we are storing it in db 
    try {

        const { orderId, courierId } = req.body;

        const token = req.shippingToken;


        if (!orderId || !courierId) {
            return next(new appError("Please try again ", 400));
        }

        // get the details of user form order id 
        const order = await Booked.findById(orderId).populate("byuser")
        // order.phase = 0;
        if (!order) {
            return next(new appError("please validate order Id", 400))
        }





        systemId = order.system_order_id;
        if (systemId) {





            const shippingpart2 = await axios.post("https://api.bigship.in/api/order/manifest/single", {
                "system_order_id": order.system_order_id,
                "courier_id": courierId
            }
                , {
                    headers: {

                        'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                    }
                });

            // now we are getting awb and other details
            if (!shippingpart2?.data?.success) {
                order.phase = 1;


                order.orderStatus = "Booked"
                order.statusUpdatedAt = Date.now()
                order.fetch = true;
                await order.save()
                res.status(400).send({
                    status: "fail",
                    msg: "faild with selected courier / It may not be available please try another one"

                })
                return
            }



            const final = await axios.post(`https://api.bigship.in/api/shipment/data?shipment_data_id=1&system_order_id=${systemId}`, {

            }
                , {
                    headers: {

                        'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                    }
                });

            if (!final?.data?.success) {
                order.phase = 2;
                order.orderStatus = "Booked"
                order.statusUpdatedAt = Date.now()
                order.fetch = true;
                order.shipOrderId = systemId

                await order.save()
                res.status(200).send({
                    status: "success",
                    msg: "order is set for courier but it is not menifested"
                })
                return
            }



            /*
            data is  {
data: 'system_order_id is 1002443557',
success: true,
message: 'Order Added Successfully !!!',
responseCode: 200
}
menifistingby 1002443557
pase2 is  {
data: null,
success: true,
message: 'Successfully Waybill Generated',
responseCode: 200
} {
data: {
courier_id: '24',
courier_name: 'Amazon 0.5Kg',
lr_number: null,
master_awb: '344251253229'
},
success: true,
message: 'Successfully Completed',
responseCode: 200
}
            */
            order.system_order_id = systemId;
            order.courier_id = courierId;
            order.master_awb = final.data?.data?.master_awb
            order.ordredPlaced = true;
            order.phase = 3

            order.platform = "bigship"
            await order.save()

            res.status(200).send({
                status: "success",
                data: "done"
            })
            return
        }



        next(new appError("Please try again", 400))


    } catch (e) {
        res.status(400).send({
            status: "fail",
            data: "done"
        })
    }



})






/*
{
 "shipment_category": "b2c",
 "warehouse_detail": {
 "pickup_location_id": 124318,
 "return_location_id": 124318
 },
 "consignee_detail": {
 "first_name": "Chandan",
 "last_name": "Bhagat",
 "company_name": "",
 "contact_number_primary": "8889998889",
 "contact_number_secondary": "9998889998",
 "email_id": "",
 "consignee_address": {
 "address_line1": "Juni jejuri tal-purnadar, dist-pune",
 "address_line2": "",
 "address_landmark": "",
 "pincode": "412303"
 }
 },
 "order_detail": { "invoice_date": "2024-07-20T05:23:49.651Z",
 "invoice_id": "2",
 "payment_type": "COD",
 "shipment_invoice_amount": 4000,
 "total_collectable_amount": 300,
 "box_details": [
 {
 "each_box_dead_weight":0.5,
 "each_box_length": 15,
 "each_box_width": 10,
 "each_box_height": 2,
 "each_box_invoice_amount": 1000,
 "each_box_collectable_amount": 300,
 "box_count":1,
 "product_details": [
 {
 "product_category": "Others",
 "product_sub_category": "PINS",
 "product_name": "Sport shirt",
 "product_quantity": 1,
 "each_product_invoice_amount": 1000,
 "each_product_collectable_amount": 200,
 "hsn": ""
 } 
 ]
 }
 ],
 "ewaybill_number": "",
 "document_detail": {
 "invoice_document_file": "",
 "ewaybill_document_file": ""
 }
 }
}





*/















