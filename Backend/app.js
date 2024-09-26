
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const env = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./utils/globalErrorHandler');
const authRoute = require('./Routes/authRoutes');
const adminRouter = require('./Routes/adminRoutes');
const path = require('path');
const productRouter = require('./Routes/productRoute');
const reviewRouter = require('./Routes/reviewRoute');
const paymentRouter = require('./Routes/paymentsRoute');
const userrouter = require('./Routes/userRouter');
const toolRouter = require('./Routes/toolsRouter');

const syncViewCounts = require('./Redis/syncViewCounts');
const shipRouter = require('./Routes/shipRoutes');


const app = express()
env.config({ path: "./config.env" })


app.use(cors())
app.use(express.static(path.join(__dirname, 'Public')))
// security for headers
app.use(helmet())
// security for mongoquery injection
app.use(mongoSanitize())
// security from html markups
app.use(xss())
// security from http parameter pollution
app.use(hpp({
    whitelist: ["price", "color"]
}))

// for get and post cors is done above but for patch,delete
app.options("*", cors())
process.on("uncaughtException", (err) => {
    console.log(err?.name, err?.message);
    console.log("UNHANDLED exception");


    process.exit(0)


})

const Limiter = rateLimit.rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "To Many request from this IP , please try again after hour"
})

app.use("/api", Limiter)

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(morgan("dev"))
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
// const redisClient = redis.createClient();

mongoose.connect(process.env.DATABASE_URL, {

})
    .then((con) => {
        console.log("database connected");
    }).catch(e => {
        console.log("not connected", e);
    })


// redisClient.on('error', (err) => console.log('Redis Client Error', err));

console.log(abc);


app.use('/api/v1/tools', toolRouter)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/user', userrouter)
app.use('/api/v1/ship', shipRouter)






app.all("*", (req, res) => {
    res.status(404).send({
        status: "error",
        msg: "please hit valid url"
    })
})

app.use(globalErrorHandler)



const server = app.listen(PORT, () => {
    console.log("server started at port ", PORT);
})

syncViewCounts();



process.on("unhandledRejection", (err) => {
    console.log(err?.name, err?.message);
    console.log("UNHANDLED REDECTION");
    server.close(() => {

        process.exit(0)
    })

})









