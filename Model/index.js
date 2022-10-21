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
  status: {
    type: String,
    
  }
});

const SeatModel = mongoose.model("Seats", seatSchema);
module.exports = SeatModel;
