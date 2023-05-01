/*
 *register users
 *login users
 *return users profile
 */

 const express = require("express"),
       router = express.Router(),
       create = require("../controllers/admin/create"),
       boxes = require("../controllers/boxes/get"),
       all = require("../controllers/admin/all");


//register route
router.get("/all", all);

router.post("/create", create);

router.post("/boxes", boxes);

module.exports = router;