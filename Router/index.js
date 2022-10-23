const express = require('express');
const { addSeats, updateSeats, getSeats } = require('../Controllers');
const { bookTable, getCustomers } = require('../Controllers/customer');
const { BookingValidator, validateResult, tablesChairsValidator } = require('../Middleware/Validator');

const router = express.Router();

router.post("/book", BookingValidator, validateResult, bookTable)
router.get('/all', getCustomers)
router.post("/seats", addSeats)
router.put("/:itemId", tablesChairsValidator, validateResult, updateSeats)
router.get('/:itemId', getSeats)


module.exports = router