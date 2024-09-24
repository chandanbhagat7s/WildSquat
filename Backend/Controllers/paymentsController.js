const catchAsync = require("../utils/catchAsync");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const appError = require("./../utils/appError");
const Booked = require("../Models/BookedProduct");
const Product = require("../Models/Product");
const User = require("../Models/User");



// (process.env.PORT);
exports.createOrder = catchAsync(async (req, res, next) => {

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
                        contact: "8567345632",
                        name: "Sandeep Sharma",
                        email: "sandeep@gmail.com"
                    });
                }
                else {
                    return next(new appError("'Something went wrong!'", 400))
                }
            }
        );

    } catch (error) {
        (error.message);
    }



})

exports.checkStatus = catchAsync(async (req, res, next) => {


    const { RAZORPAY_SECRET_KEY } = process.env;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productids, quantity, type } = req.body;



    const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_SECRET_KEY)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // (req.body);

    if (generated_signature !== razorpay_signature) {
        return next(new appError("transaction failed please try again", 400))
    }

    const product = await Product.find({ _id: { $in: productids } }).select("_id name price dimension coverImage stockPlace weight")



    const Ordred = await Booked.create({
        ofProduct: product,
        byuser: req.user._id,
        price: product.price,
        quantity,
        type,
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











