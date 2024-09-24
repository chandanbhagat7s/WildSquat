const Booked = require("../Models/BookedProduct");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios")
let token = "";
// Function to login and fetch token
async function loginAndGetToken() {

}


// If you're using Node.js version below 18

exports.ensureShippingAuth = catchAsync(async (req, res, next) => {
    console.log("CAME TO GENERATE");

    if (!token || Date.now() >= tokenExpiryTime) {
        console.log("id and pass", process.env.SHIP_PASSWORD, process.env.SHIP_USERNAME);

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
            return console.log(response);

        }

        const data = await response.json(); // Parse JSON response
        console.log(data);

        // token = data.token;  // Save the token if needed
        console.log("Token is", data?.data?.token);
        token = data?.data?.token

        tokenExpiryTime = Date.now() + 12 * 60 * 60 * 1000; // Set token expiry for 12 hours
    }

    next(); // Proceed to the next middleware or route handler
});




exports.shipProduct = catchAsync(async (req, res, next) => {
    // we are requesting thirdpatry api so in case of shipping we are storing it in db 
    try {
        /*
        we are going to try this many service
        "courier_name": "Ekart Surface",
         "courier_id": 2,
"courier_name": "Ekart Surface 1Kg",
 "courier_id": 29,
 "courier_name": "Ekart Surface 2Kg",
 "courier_id": 30,
"courier_name": "Amazon 0.5Kg",
 "courier_id": 24,
"courier_name": "Amazon 1Kg",
 "courier_id": 25,
"courier_name": "Amazon 2Kg",
 "courier_id": 26,
        */
        const { orderId } = req.body;
        console.log("CAME WIHT ORDERID", orderId);

        if (!orderId) {
            return next(new appError("Order id not created, please pass OrderId", 400));
        }

        // get the details of user form order id 
        const order = await Booked.findById(orderId).populate("byuser")
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
        console.log("oop", order.ofProduct);

        let orderDetails = order.ofProduct.map((el) => {


            let dim = el.dimension[0].split(",");
            let l = dim[0] * 1, b = dim[1] * 1, h = dim[2] * 1;
            calculation = { ...calculation, lengthh: calculation.lengthh + l, breadth: calculation.breadth + b, height: calculation.height + h, weight: calculation.weight + el.weight, price: calculation.price + el.price }
            let obj = {
                "product_category": "FashionClothing",
                "product_sub_category": "",
                "product_name": el.name,
                "product_quantity": 1,
                "each_product_invoice_amount": el.price,
                "each_product_collectable_amount": el.price / 10,
                "hsn": ""
            }
            return obj

        })



        const d = new Date()

        const shippingDetails = {
            "shipment_category": "b2c",
            "warehouse_detail": {
                "pickup_location_id": order?.ofProduct?.stockPlace || 122222,
                "return_location_id": order?.ofProduct?.stockPlace || 122222
            },
            "consignee_detail": {
                "first_name": order?.byuser?.name,
                "last_name": order?.byuser?.name,
                "company_name": "",
                "contact_number_primary": `${order?.byuser?.mobile}`,
                "contact_number_secondary": "",
                "email_id": "",
                "consignee_address": {
                    "address_line1": `${order?.byuser?.addressLine1}`,
                    "address_line2": `${order?.byuser?.state} , ${order?.byuser?.country}`,
                    "address_landmark": "",
                    "pincode": `${order.byuser.pinCode}`
                }
            },
            "order_detail": {
                "invoice_date": d.toUTCString(Date.now()),
                "invoice_id": `${d.getMilliseconds()}`,
                "payment_type": order?.type || "COD",
                "shipment_invoice_amount": calculation.price,
                "total_collectable_amount": calculation.price / 10,
                "box_details": [
                    {
                        "each_box_dead_weight": calculation.weight,
                        "each_box_length": calculation.lengthh || 20,
                        "each_box_width": calculation.breadth || 15,
                        "each_box_height": calculation.height || 2,
                        "each_box_invoice_amount": calculation.price,
                        "each_box_collectable_amount": calculation.price / 10,
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



        // creating system id of order
        const shippingpart1 = await axios.post("https://api.bigship.in/api/order/add/single", shippingDetails, {
            headers: {

                'Authorization': `Bearer ${token}` // Authorization header with Bearer token
            }
        });

        // if (condition) {

        // }



        // "system_order_id is 1002443475" , now further manifasting it 
        console.log("data is ", shippingpart1.data);

        let systemId = shippingpart1?.data?.data
        systemId = systemId.length > 0 ? systemId.split(" ") : false

        if (systemId) {
            console.log("menifistingby", systemId[systemId.length - 1]);

            const shippingpart2 = await axios.post("https://api.bigship.in/api/order/manifest/single", {
                "system_order_id": systemId[systemId.length - 1],
                "courier_id": 24
            }
                , {
                    headers: {

                        'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                    }
                });

            // now we are getting awb and other details

            const final = await axios.post(`https://api.bigship.in/api/shipment/data?shipment_data_id=1&system_order_id=${systemId[systemId.length - 1]}`, {

            }
                , {
                    headers: {

                        'Authorization': `Bearer ${token}` // Authorization header with Bearer token
                    }
                });

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
            order.system_order_id = systemId[systemId.length - 1];
            order.courier_id = final.data?.data?.courier_id * 1
            order.courier_name = final.data?.data?.courier_name
            order.master_awb = final.data?.data?.master_awb
            order.ordredPlaced = true;
            await order.save()
            console.log("pase2 is ", shippingpart2.data, final.data);


        }



        res.status(200).send({
            status: "success",
            data: "done"
        })


    } catch (e) {
        console.log("done shippingpart1", e);
        res.status(400).send({
            status: "fail",
            data: "done"
        })
    }



})

exports.getAllWarehouse = catchAsync(async (req, res, next) => {
    try {
        console.log("requesting", token);

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















