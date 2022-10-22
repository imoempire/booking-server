const { isValidObjectId } = require("mongoose");
const SeatModel = require("../Model");
const Customers = require("../Model/customer");

exports.Home = async (req, res) => {
  try {
    const items = await SeatModel.find().lean().exec();
    const tablesLeft = await SeatModel.find({});
    const { tables, chairs } = tablesLeft[0];

   //  console.log(typeof Number(tables));
    res.json({ tables, chairs });
  } catch (err) {
    res.status(500).end(err);
  }
};

exports.bookTable = async (req, res) => {
  const { name, contact, customers } = req.body;
  const TotalTables = await SeatModel.find({});
  let itemId = "6353dbe004b349cda76fa722";

  let number = Number(customers);
  if (!isValidObjectId(itemId))
    return res.status(404).json({ message: "Invalid post" });

  const tableChairs = await SeatModel.findById(itemId);
  if (!tableChairs) return res.status(404).json({ message: "Not found" });

  let { tables, chairs, table } = TotalTables[0];
  if (tables.length === 0)
  return res
  .status(404)
  .json({ error: "Sorry there are no available tables" });
  
  if (number > tables.length)
    return res
      .status(404)
      .json({
        error:
          "The available tables less than the number of people you are requesting",
      });

  let tablesToBook = 0;
  if (number <= 4) {
    tablesToBook += 1;
  } else if (number <= 8) {
    tablesToBook += 2;
  } else if (number <= 12) {
    tablesToBook += 3;
  } else if (number <= 16) {
    tablesToBook += 4;
  } else if (number <= 20) {
    tablesToBook += 5;
  } else if (number <= 24) {
    tablesToBook += 5;
  } else {
    console.log("error");
  }

  let selectedTables = {};
  let bookedTable=[]

  selectedTables = tables.slice(-tablesToBook);
  for (let i=0; i<selectedTables.length; i++){
   bookedTable.push(selectedTables)
  }
//   console.log(bookedTable, tables.length);

  const book = table - tablesToBook;
  const totalchairs = chairs.length;
  const chair = totalchairs - number;
  const first = tables[0];

  // Auto Label
  let tablesLeft = [];
  let chairsLeft = [];
  for (let i = 1; i <= book; i++) {
    tablesLeft.push("Table" + i);
  }
  for (let i = 1; i <= chair; i++) {
    chairsLeft.push("Chair" + i);
  }

  // Update SeatModel
  tableChairs.table = book;
  tableChairs.chairsPer = chair;
  tableChairs.tables = tablesLeft;
  tableChairs.chairs = chairsLeft;

  const newCustomer = await Customers({ name, contact, customers, bookedTable });

  await tableChairs.save();
  await newCustomer.save();

  res.json({
    customer: {
      id: newCustomer._id,
      customerName: newCustomer.name,
      customerNumber: newCustomer.contact,
      numberofcustomers: newCustomer.customers,
      tables,
      chairs,
      bookedTable      
    },
    message: `${tablesToBook} requied: Please head to ${selectedTables}`,
    success: true,
  });
};