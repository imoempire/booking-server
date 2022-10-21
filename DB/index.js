const mongoose = require("mongoose");

// .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
mongoose
   .connect('mongodb://localhost:27017/bookingApp', { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((error) => console.log(error));
