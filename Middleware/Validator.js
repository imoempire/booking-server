const { check, validationResult } = require("express-validator");

exports.BookingValidator = [
   // check name
  check("name").trim().not().isEmpty().withMessage("Please we need a name"),
   // check contact
  check("contact")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please we need your contact"),
    check("number").trim().not().isEmpty().withMessage("Please we need number of people you are booking for!")
];

exports.tablesChairsValidator = [
  // check name
 check("table").trim().not().isEmpty().withMessage("maximum table is required"),
  // check contact
 check("chairsPer")
   .trim()
   .not()
   .isEmpty()
   .withMessage("chair per table is required"),
];

exports.validateResult = (req, res, next) => {
   const error = validationResult(req).array();
   if (error.length) {
    console.log(error);
     res.status(401).json({ error: error[0].msg });
   }
   next();
 };
