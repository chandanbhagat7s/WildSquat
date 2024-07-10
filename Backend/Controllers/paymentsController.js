const catchAsync = require("../utils/catchAsync");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const appError = require("./../utils/appError");
const Booked = require("../Models/BookedProduct");
const Product = require("../Models/Product");



// console.log(process.env.PORT);
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
        console.log(error.message);
    }



})

exports.checkStatus = catchAsync(async (req, res, next) => {


    const { RAZORPAY_SECRET_KEY } = process.env;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productid } = req.body;


    const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_SECRET_KEY)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // console.log(req.body);

    if (generated_signature !== razorpay_signature) {
        return next(new appError("transaction failed please try again", 400))
    }

    const product = await Product.findById(productid)

    if (!product) {
        return next(new appError("sorry product not found", 400))
    }
    const Ordred = await Booked.create({
        ofProduct: product._id,
        byuser: req.user._id,
        price: product.price
    })

    if (!Ordred) {
        return next(new appError("sorry product not found", 400))

    }



    res.status(200).send({
        status: "success",
        msg: "payment done "
    })
})











