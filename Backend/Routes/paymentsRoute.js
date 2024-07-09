const express = require('express');
const { createOrder, checkStatus } = require('../Controllers/paymentsController');
const paymentRouter = express()





// paymentRouter.post('/payment', newPayment);
// paymentRouter.post('/status/:txnId', checkStatus);


paymentRouter.post('/createOrder', createOrder);
paymentRouter.post('/verifyPayment', checkStatus);


module.exports = paymentRouter