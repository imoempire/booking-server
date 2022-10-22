const { isValidObjectId } = require("mongoose");
const SeatModel = require("../Model");

exports.addSeats = async (req, res) => {
  const { table, chairsPer } = req.body;


  let tables= [];
  let chairs=[]

  for (let i = 1; i <= table; i++){
    tables.push("T"+i);
  }
  for (let i = 1; i <= chairsPer; i++){
    chairs.push("C"+i);
  }

  const newSeats = await SeatModel({table, chairsPer, tables, chairs});

  await newSeats.save();

  res.json({
    seats: {
      id: newSeats._id,
      tables,
      chairs
   },
  });
};

exports.getSeats = async (req, res) => {
  const { itemId } = req.params;
  if (!itemId)
    return res.status(401).json({ message: "Invalid post" });

  const item = await SeatModel.findOne({itemId});
  if (!item) return res.status(404).json({ message: "Item not found" });

  const {table, chairsPer, tables, chairs} = item;

  const totalchairs = chairs.length

  // console.log();

  res.json({
    seats: {
      id: item._id,
      table,
      chairsPer,
      tables,
      chairs,
      totalchairs
   },
  })
  
};

exports.updateSeats = async (req, res) => {
  const { table, chairsPer } = req.body;
  // console.log(typeof table);

  const {itemId} = req.params;
  if (!isValidObjectId(itemId)) 
  return res.status(404).json({ message: "Invalid post" });
  
  const tableChairs = await SeatModel.findById(itemId);
  if (!tableChairs) return res.status(404).json({ message: "Not was found"});

  let tables= [];
  let chairs=[]

  const chair = table * chairsPer

  for (let i = 1; i <= table; i++){
    tables.push("Table"+i);
  }
  for (let i = 1; i <= chair; i++){
    chairs.push("Chair"+i);
  }

  tableChairs.table = table;
  tableChairs.chairsPer = chairsPer;
  tableChairs.tables = tables;
  tableChairs.chairs = chairs;

  await tableChairs.save();

  res.json({
    seats: {
      id: tableChairs._id,
      table,
      chairsPer,
      tables,
      chairs
   },
   success: true
  });
};