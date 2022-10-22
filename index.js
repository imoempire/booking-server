const express = require('express');
require("dotenv").config();
require("./DB/index")
const routers = require('./Router/index')
const cors = require('cors');
const { Home } = require('./Controllers/customer');
const server = express();

server.use(cors({origin: "http://localhost:6840"}))
server.use(express.json())
server.use(routers)

server.get('/', Home)

const port = process.env.PORT || 8560

server.listen(port, () => {
  console.log(`server is working on ${port}`);
});