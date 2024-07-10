const express = require('express');
const { createOrder, checkStatus } = require('../Controllers/paymentsController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const paymentRouter = express()





// paymentRouter.post('/payment', newPayment);
// paymentRouter.post('/status/:txnId', checkStatus);

paymentRouter.use(isLoggedIn, giveAccess("user"))
paymentRouter.post('/createOrder', createOrder);
paymentRouter.post('/verifyPayment', checkStatus);


module.exports = paymentRouter