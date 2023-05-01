/*
 *register users
 *login users
 *return users profile
 */

 const express = require("express"),
       router = express.Router(),
       register = require("../controllers/users/register"),
       login = require("../controllers/users/login"),
       refresh = require("../controllers/users/refresh"),
       self = require("../controllers/users/self"),
       lines = require("../controllers/users/lines"),
       reset = require("../controllers/users/reset"),
       {check,password} = require("../middleware/users/validators"),
       upline = require("../middleware/users/upline"),
       auth = require("../middleware/auth/auth"),
       errors = require("../validators/errors"),
       vee = require("../validators/users");


//register route
router.post("/register", vee.v_register_data, errors, upline, register);

//login route
router.post("/login", vee.v_login_data, errors, check("username","body","username"), password, login);

//refresh route
router.post("/refresh", refresh);

router.get("/self", auth, self)

router.get("/lines", auth, lines)

router.get("/reset",reset)

module.exports = router;