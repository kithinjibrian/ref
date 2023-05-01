const {check} = require("express-validator");

const v_trivia_data = [
    check("answers")
    .isArray()
    .withMessage("Expected answers in an array format.")
    .notEmpty()
    .withMessage("Some answers are missing!")
];

module.exports = {
    v_trivia_data
}