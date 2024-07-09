
const express = require('express');
const mongoose = require('mongoose');
const env = require("dotenv");

const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./utils/globalErrorHandler');
const authRoute = require('./Routes/authRoutes');
const adminRouter = require('./Routes/adminRoutes');
const path = require('path');
const productRouter = require('./Routes/productRoute');
const reviewRouter = require('./Routes/reviewRoute');
const paymentRouter = require('./Routes/paymentsRoute');

const app = express()
env.config({ path: "./config.env" })

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

mongoose.connect(process.env.DATABASE_URL, {

})
    .then((con) => {
        console.log("database connected");
    }).catch(e => {
        console.log("not connected", e);
    })





app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/payment', paymentRouter)

app.all("*", (req, res) => {
    res.status(404).send({
        status: "error",
        msg: "please hit valid url"
    })
})

app.use(globalErrorHandler)


app.listen(PORT, () => {
    console.log("server started at port ", PORT);
})


