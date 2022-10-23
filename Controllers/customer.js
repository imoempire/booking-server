const { isValidObjectId } = require("mongoose");
const SeatModel = require("../Model");
const Customers = require("../Model/customer");

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
    tablesToBook += 6;
  } else if (number <= 28) {
    tablesToBook += 7;
  } else if (number <= 32) {
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

  const tableLeft = tables.length;
  let customersLeft = ''
  if (tablesToBook > tableLeft) {
    customersLeft = customers - (tableLeft*chairsPer)
    return res.status(404).json({
      error: `${tablesToBook} table(s) requied: But only ${tableLeft} available: head to ${selectedTables} and ${customersLeft} s required to wait till next available 
      table, `,
    });
  }

  const book = table - tablesToBook;
  const totalchairs = chairs.length;
  const chair = totalchairs - number;

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
  
  const items = await Customers.find()

  const customersCount = await Customers.countDocuments();

  res.json({
    customers: items.map((customer)=>(
      {
        id: customer.id,
        name: customer.name,
        contact: customer.contact,
        customers: customer.customers,
      }
    )),
    customersCount,
  });
};
