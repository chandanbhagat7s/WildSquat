const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require("../utils/sendMail");
const Otp = require("../Models/Otp");


const createTokenSendRes = (id, res, statusCode, data) => {

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRIR_IN
    });
    console.log("token is ", token);
    let cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),


        // secure: true,
        httpOnly: true,
        // sameSite: "None",
        path: "/",
    };
    if (process.env.NODE_ENV == 'production') {

        cookieOptions.secure = true
    }
    res.cookie('jwt', token, cookieOptions);

    // we will set cookies 
    res.status(statusCode).json({
        status: "success",
        data,
        token

    })
}


exports.login = catchAsync(async (req, res, next) => {
    console.log(req);
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new appError("please enter credential for get into in ", 400));
    }

    const user = await User.findOne({ email }).select('+password')


    if (!user || !await user.correctPass(password, user.password)) {

        return next(new appError("please enter valid email id and password", 400));
    }
    user.password = undefined
    createTokenSendRes(user.id, res, 200, user)

})

exports.signUp = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { name
        , email
        , mobile
        , state
        , country
        , district
        , pinCode
        , password
        , addressLine1,
        otp,
        otpId } = req.body;

    if (
        !name ||
        !email ||
        !mobile ||
        !state ||
        !country ||
        !district ||
        !pinCode ||
        !password ||
        !addressLine1
    ) {
        return next(new appError("Please fill all the fields", 400))
    }
    if (!otp) {
        return next(new appError("please enter otp first", 400))
    }

    const otpDoc = await Otp.findById(otpId)

    if (!otpDoc) {
        return next(new appError("Please Try again Otp is not send ", 400))
    }

    if (otp * 1 !== otpDoc.otp) {
        return next(new appError("Otp is not correct , please enter valid otp  ", 400))

    }






    const newUser = await User.create({
        name
        , email
        , mobile
        , state
        , country
        , district
        , pinCode
        , addressLine1
        , password
    });
    if (!newUser) {
        return next(new appError("something went wrrong  ", 500));

    }
    console.log(newUser);
    newUser.password = undefined;
    createTokenSendRes(newUser._id, res, 201, newUser)
});



exports.forgotPassword = catchAsync(async (req, res, next) => {

    const { email } = req.body;
    if (!email) {
        return next(new appError("please enter email for changing the password", 400));
    }

    // we need to find the user from DB and set password reset token in enc format
    const user = await User.findOne({ email })
    if (!user) {
        return next(new appError("user do not exist with this mail ID,please register with your mail ID", 400));
    }

    try {
        const token = user.setPasswordRestToken();
        console.log(token);
        let message = `to reset the passwored click heare ${req.protocol}://${req.hostName}/api/v1/resetPassword/${token} `;

        console.log("the token is ", token);
        // saving the user to database
        await user.save({ validateBeforeSave: false })
        // we will send the message of route and token on email address and 
        await sendEmail()
    } catch (error) {
        console.log(error);
        user.passwordResetToken = undefined;
        user.expiresIn = undefined;
        await user.save();
        return next(new appError("please try to change the password after some time", 404))
    }


    res.status(200).json({
        status: 'success',
        message: "check your email to reset password !!"
    })




})




exports.resetPassword = catchAsync(async (req, res, next) => {
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    if (!password) {
        return next(new appError("please enter password to be set", 400))
    }
    let token = req.params.token;


    // we need to create hash and then find it in database 

    token = crypto.createHash('sha256').update(token).digest('hex');
    let user = await User.findOne({
        passwordResetToken: token, passwordExpires: { $gt: Date.now() }
    })

    if (!user) {
        return next(new appError("please enter valid token or token has been expired", 400))
    }

    user.password = password;

    user.passwordResetToken = undefined;
    user.passwordExpires = undefined;

    await user.save();

    createTokenSendRes(user._id, res, 200, "your password is changed")









})



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


exports.genrateOtpAndSend = catchAsync(async (req, res, next) => {
    const { number, email } = req.body;

    const alreadyExist = await User.findOne({
        $or: [
            { email: email },
            { mobile: number }
        ]
    })

    if (alreadyExist) {
        return next(new appError("User already exist with your email or mobile number", 400))
    }



    if (!number) {
        return next(new appError("Please Provide Mobile Number to send OTP", 400))
    }

    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const otp = generateOTP();
    const otpDoc = await Otp.create({
        // otp: 123456,
        otp: otp,
        validUntil: Date.now() + 1000 * 60 * 10
    })

    console.log(process.env.UN, number, process.env.API_KEY, process.env.REG_TEMPLATE_ID,);

    const sent = await sendSMS(process.env.UN, process.env.API_KEY, process.env.REG_TEMPLATE_ID, process.env.FROM, number, `OTP for new registration request is,  ${otp}. Please enter this to verify your identity and proceed with the new registration request. - WLDSQT`)
    console.log(sent);






    res.status(200).send({
        status: "success",
        otpId: otpDoc._id,
        msg: "Opt Sent To Your Mobile no."
    })
})






