const express = require('express');
const { createOrder, checkStatus, refundPayment } = require('../Controllers/paymentsController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const { ensureShippingAuth, checkForExpressBeeMiddlewareAvaibility } = require('../Controllers/shipController');
const paymentRouter = express()





// paymentRouter.post('/payment', newPayment);
// paymentRouter.post('/status/:txnId', checkStatus);

paymentRouter.use(isLoggedIn, giveAccess("user"))
paymentRouter.post('/createOrder', ensureShippingAuth, checkForExpressBeeMiddlewareAvaibility, createOrder);
paymentRouter.post('/verifyPayment', checkStatus);


module.exports = paymentRouter