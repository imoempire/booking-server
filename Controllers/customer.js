const { isValidObjectId } = require("mongoose");
const SeatModel = require("../Model");
const Customers = require("../Model/customer");
const QueueModel = require("../Model/Queue");

exports.bookTable = async (req, res) => {
  const { name, contact, customers } = req.body;
  const TotalTables = await SeatModel.find({});
  let itemId = "6354f8bb95fa8e60bc977a22";

  let number = Number(customers);
  if (!isValidObjectId(itemId))
    return res.status(404).json({ message: "Invalid post" });

  const tableChairs = await SeatModel.findById(itemId);
  if (!tableChairs) return res.status(404).json({ message: "Not found" });

  let { tables, chairs, table, chairsPer } = TotalTables[0];

  if (tables.length === 0)
    return res
      .status(404)
      .json({ error: "Sorry no available tables join the qeuee with" });

  let tablesToBook = 0;
  let customersnumbers = number;

  

  if (customersnumbers <= 4) {
    tablesToBook += 1;
  } else if (customersnumbers <= 8) {
    tablesToBook += 2;
  } else if (customersnumbers <= 12) {
    tablesToBook += 3;
  } else if (customersnumbers <= 16) {
    tablesToBook += 4;
  } else if (customersnumbers <= 20) {
    tablesToBook += 5;
  } else if (customersnumbers <= 24) {
    tablesToBook += 6;
  } else if (customersnumbers <= 28) {
    tablesToBook += 7;
  } else if (customersnumbers <= 32) {
    tablesToBook += 8;
  } else {
    console.log("error");
  }
  let selectedTables = {};
  let bookedTable = [];

  selectedTables = tables.slice(-tablesToBook);
  for (let i = 0; i < selectedTables.length; i++) {
    bookedTable.push(selectedTables);
  }

  let book = 0

   book = table - tablesToBook;
  const totalchairs = chairs.length;
  const chair = totalchairs - number;
  
  const tableLeft = tables.length;
  let customersLeft = "";
  if (tablesToBook > tableLeft) {
    book = 0;
    customersLeft = customers - tableLeft * chairsPer;
    const queueNo = contact.slice(-2) + Math.floor(Math.random());
    // console.log(queueNo);
    // const newQueue = await QueueModel({name, queueNo })
    return res.status(404).json({
      error: `${tablesToBook} table(s) requied: But only ${tableLeft} available: head to ${selectedTables} and ${customersLeft} s required to wait till next available 
      table, QUEUE No ${queueNo} `,
    });
  }
  console.log(book);

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
  if(tablesToBook> tableLeft){
    tableChairs.table = 0
  }
  tableChairs.chairsPer = chairsPer;
  tableChairs.tables = tablesLeft;
  tableChairs.chairs = chairsLeft;

  const newCustomer = await Customers({
    name,
    contact,
    customers,
    bookedTable,
  });

  await tableChairs.save();
  await newCustomer.save();

  res.json({
    customer: {
      id: newCustomer._id,
      name,
      contact,
      customers,
      bookedTable,
    },
    message: `${tablesToBook} table(s) requied: Please head to ${selectedTables}`,
    success: true,
  });
};

exports.getCustomers = async (req, res) => {
  const items = await Customers.find();

  const customersCount = await Customers.countDocuments();

  res.json({
    customers: items.map((customer) => ({
      id: customer.id,
      name: customer.name,
      contact: customer.contact,
      customers: customer.customers,
    })),
    customersCount,
  });
};
