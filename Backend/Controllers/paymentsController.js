const catchAsync = require("../utils/catchAsync");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const appError = require("./../utils/appError");
const Booked = require("../Models/BookedProduct");
const Product = require("../Models/Product");
const User = require("../Models/User");



// (process.env.PORT);
exports.createOrder = catchAsync(async (req, res, next) => {
    console.log("fetch", req.courier);

    const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
    const razorpayInstance = new Razorpay({
        key_id: RAZORPAY_ID_KEY,
        key_secret: RAZORPAY_SECRET_KEY
    });


    try {
        const amount = req.body.amount * 100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options,
            (err, order) => {
                if (!err) {
                    res.status(200).send({
                        success: true,
                        msg: 'Order Created',
                        order_id: order.id,
                        amount: amount,
                        key_id: RAZORPAY_ID_KEY,
                        product_name: req.body.name,
                        description: req.body.description,
                        contact: `${req.user.mobile}`,
                        name: req.user.name,
                        email: req.user.email
                    });
                }
                else {
                    return next(new appError("'Something went wrong!'", 400))
                }
            }
        );

    } catch (error) {
        console.log(error);
    }



})

exports.checkStatus = catchAsync(async (req, res, next) => {


    const { RAZORPAY_SECRET_KEY } = process.env;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productData } = req.body;
    console.log("data", razorpay_order_id, razorpay_payment_id, razorpay_signature, productData);




    const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_SECRET_KEY)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // (req.body);

    if (generated_signature !== razorpay_signature) {
        return next(new appError("transaction failed please try again", 400))
    }





    const Ordred = await Booked.create({
        productData: productData,
        byuser: req.user._id,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        type: "Prepaid",
    })

    if (!Ordred) {
        return next(new appError("failed something went wrong", 400))

    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        $push: { Ordred }
    }, {
        new: true
    })








    res.status(200).send({
        status: "success",
        orderId: Ordred._id,
        msg: "payment done "
    })
})











