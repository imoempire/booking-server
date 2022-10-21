const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  }

});

const Customers = mongoose.model("Customer", customerSchema);

module.exports = Customers;
