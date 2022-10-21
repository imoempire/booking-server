const SeatModel = require("../Model");

exports.addSeats = async (req, res) => {
  const { table, chairsPer } = req.body;

  const newSeats = await SeatModel({ table, chairsPer });

  await newSeats.save();

  res.json({
    seats: {
      id: newSeats._id,
      table,
      chairsPer
   },
   message: `${table} with ${chairsPer} chairs has been added`
  });
};
