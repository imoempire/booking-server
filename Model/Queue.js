const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QueueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  queueNo: {
    type: Number,
    required: true,
  },
});

const QueueModel = mongoose.model("queue", QueueSchema);
module.exports = QueueModel;
