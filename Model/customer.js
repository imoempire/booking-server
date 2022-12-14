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
  customers: {
    type: Number,
    required: true,
  },
  bookedTables: {
    type: Array,
  },
  bookChairs: {
    type: Number,
  },
  Totaltab: {
    type: Number,
  }
});

const Customers = mongoose.model("Customer", customerSchema);

module.exports = Customers;
