/*
 *register users
 *login users
 *return users profile
 */

 const express = require("express"),
       router = express.Router(),
       mpesa = require("../controllers/hooks/mpesa");


router.post("/mpesa", mpesa);

module.exports = router;