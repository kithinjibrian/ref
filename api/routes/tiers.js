const express = require("express"),
      router = express(),
      e = require("../utils/e"),
      enroll = require("../controllers/tiers/enroll"),
      all = require("../controllers/tiers/all"),
      deposit = require("../controllers/tiers/deposit"),
      withdraw = require("../controllers/tiers/withdraw"),
      auth = require("../middleware/auth/auth"),
      errors = require("../validators/errors"),
      vee = require("../validators/tiers");

router.get("/all", auth, all);

router.post("/enroll", auth, vee.v_enroll_data, errors, enroll);

router.post("/deposit", auth, vee.v_tier_deposit, errors, deposit);

router.post("/withdraw", auth, vee.v_tier_withdraw, errors, withdraw);

router.get("/runner",async (req,res)=>{
    e();
    res.send("run")
});

module.exports = router;