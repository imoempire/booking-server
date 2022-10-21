const express = require('express');
const { addSeats } = require('../Controllers');
const { bookTable } = require('../Controllers/customer');
const { BookingValidator, validateResult, tablesChairsValidator } = require('../Middleware/Validator');

const router = express.Router();

router.post("/book", BookingValidator, validateResult, bookTable)
router.post("/seats", tablesChairsValidator, validateResult, addSeats)


module.exports = router