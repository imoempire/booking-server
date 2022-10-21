const SeatModel = require("../Model");
const Customers = require("../Model/customer");


exports.bookTable = async (req, res) => {
   const {name, contact, number} = req.body;

   // Ifs userModel.countDocuments({name: "sam"});
   const tablesLeft = await SeatModel.countDocuments({name: "Table"})
   if (tablesLeft === 0) return res.status(401).json({
      error: "Sorry All table a booked at the moment"
   }) 

   // const first = await SeatModel[0]
   console.log(first);

   const newCustomer = await Customers({name, contact, number});
   await newCustomer.save();

   res.json({
      customer: {
         id: newCustomer._id,
         customerName: newCustomer.name,
         customerNumber: newCustomer.contact,
         numberofcustomers: newCustomer.number
      },
      success: true,
   })
}