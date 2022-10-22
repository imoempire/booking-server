const mongoose = require("mongoose");

// .connect('mongodb://localhost:27017/bookingApp', { useNewUrlParser: true })
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((error) => console.log(error));
