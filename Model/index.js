const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seatSchema = new Schema({
  table: {
    type: Number,
    required: true,
  },
  chairsPer: {
    type: Number,
    required: true,
  },
  tables: {
    type: Array,
  },
  chairs: {
    type: Array
  }
});

const SeatModel = mongoose.model("Seats", seatSchema);
module.exports = SeatModel;
