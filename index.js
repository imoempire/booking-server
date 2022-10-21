const express = require('express');
require("dotenv").config();
require("./DB/index")
const routers = require('./Router/index')

const server = express();

server.use(express.json())
server.use(routers)

server.get('/', (req, res) => {
   res.json({
      success: true,
      message: 'Success'
   })
})

const port = process.env.PORT || 8560

server.listen(port, () => {
  console.log(`server is working on ${port}`);
});