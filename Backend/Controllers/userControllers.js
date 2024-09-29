const Otp = require("../Models/Otp");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


const sendSMS = async (userName, apiKey, templateId, senderName, to, message) => {
    const url = `https://account.bulksms.services/index.php/api/bulk-sms.html?username=${userName}&api_key=${apiKey}&template_id=${templateId}&from=${senderName}&to=${to}&message=${message}&sms_type=2`;


    try {
        const response = await fetch(url, {
            method: "GET"
        });
        const result = await response.text();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


exports.getCartHeartOrders = catchAsync(async (req, res, next) => {

    const product = await User.findById(req.user._id).populate({
        path: 'cart  Ordred',
        select: "name price coverImage sizes",

    })



    res.status(200).send({
        status: "success",
        product
    })












})

exports.getOrderProducts = catchAsync(async (req, res, next) => {

    const orders = await User.find({
        _id: req.user._id,

    }).populate({
        path: 'Ordred',
        select: "-__v",

    })



    res.status(200).send({
        status: "success",
        orders
    })
})




exports.editProfile = catchAsync(async (req, res, next) => {
    const { name,
        email,
        country,
        state,
        district,
        pinCode,
        addressLine1 } = req.body;

    if (!name || !email || !country || !state || !pinCode || !district || !addressLine1) {
        return next(new appError("Please provide entire data to update", 400))
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        name,
        email,
        country,
        state,
        district,
        pinCode,
        addressLine1
    }, {
        new: true
    })

    if (!user) {

        return next(new appError("Profile not updated please try again", 400))
    }

    res.status(200).send({
        status: "success",
        msg: "Profile Updated "
    })
})



exports.changeNumber = catchAsync(async (req, res, next) => {
    const { number } = req.body;

    if (!number) {
        return next(new appError("Please Provide Mobile Number to send OTP", 400))
    }
    const existing = await User.findOne({ mobile: number })

    if (existing) {
        return next(new appError("Please Provide another number , This is already used", 400))

    }
    const otp = generateOTP();
    const otpDoc = await Otp.create({

        otp: otp,
        validUntil: Date.now() + 1000 * 60 * 10
    })



    const sent = await sendSMS(process.env.UN, process.env.API_KEY, process.env.REG_TEMPLATE_ID, process.env.FROM, number, `OTP for new registration request is,  ${otp}. Please enter this to verify your identity and proceed with the new registration request. - WLDSQT`)

    res.status(200).send({
        status: "success",
        otpId: otpDoc._id,
        msg: "Opt Sent To Your Mobile no."
    })
})


exports.verifyOtpChangeNumber = catchAsync(async (req, res, next) => {
    console.log(req.body);

    const number = req.body.number * 1;
    const otp = req.body.otp;
    const otpId = req.body.otpId



    if (!otpId || number?.length < 10) {
        return next(new appError("Please retry again to genrate otp", 400))
    }
    if (!otp || otp?.length < 6) {
        return next(new appError("please Enter valid otp", 400))
    }

    const otpDoc = await Otp.findById(otpId)
    if (!otpDoc) {
        return next(new appError("please Try again to genrate otp", 400))

    }

    const user = await User.findById(req.user._id)
    if (otpDoc.otp != otp) {
        return next(new appError("please enter valid otp", 400))
    }

    user.mobile = number;
    await user.save()

    res.status(200).send({
        status: "success",
        msg: "Mobile Number Updated"
    })
})






