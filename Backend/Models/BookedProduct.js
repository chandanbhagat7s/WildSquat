
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  byuser: {
    required: [true, "must have an owner"],
    type: mongoose.mongo.ObjectId,
    ref: "user"
  },

  productData: {
    type: Object
  },
  ordredPlaced: {
    type: Boolean,
    default: false,
  },
  orderMessage: {
    type: String,
    defalut: "Will be delivered within 2-3 days"
  },

  charges: {
    type: Number
  },
  type: {
    type: String,
    enum: ["COD", "Prepaid"]
  },
  system_order_id: {
    type: Number
  },
  master_awb: {
    type: String
  },
  courier_id: {
    type: Number
  },
  courier_name: {
    type: String
  },
  deilvired: {
    type: Boolean,
    default: false
  },
  phase: {
    type: Number,
    /*
    0 - nothing done
    1 - systemid genrated
    2 - menifested
    3 -completed
    
    */
  },
  paymentId: String,
  orderId: String,
  refunded: {
    type: Boolean,
    default: false
  },
  cancledShipment: {
    type: Boolean,
    default: false
  },
  time: {
    type: Date,
    default: Date.now
  },
  shipOrderId: {
    type: String
  },
  statusUpdatedAt: {
    type: Date,

  },
  orderStatus: {
    type: String
  },
  platform: {
    type: String,
    enum: ["bighship", "expressbee"]
  }







})

const Booked = mongoose.model("Booked", productSchema)

module.exports = Booked





/*
{
  "shipment_category": "b2c",
  "warehouse_detail": {
    "pickup_location_id": 122222,
    "return_location_id": 122222
  },
  "consignee_detail": {
    "first_name": "Prakash Bhagat",
    "last_name": "Prakash Bhagat",
    "company_name": "",
    "contact_number_primary": 9096413579,
    "contact_number_secondary": "",
    "email_id": "",
    "consignee_address": {
      "address_line1": "Juni -Jejuri , tal - Purandar , Maharashtra , India",
      "address_line2": "",
      "address_landmark": "",
      "pincode": 412303
    }
  },
  "order_detail": {
    "invoice_date": "Thu, 19 Sep 2024 13:20:10 GMT",
    "invoice_id": "793",
    "payment_type": "COD",
    "shipment_invoice_amount": 0,
    "box_details": [
      [
        null
      ]
    ],
    "ewaybill_number": "",
    "document_detail": {
      "invoice_document_file": "",
      "ewaybill_document_file": ""
    }
  }
}

*/












