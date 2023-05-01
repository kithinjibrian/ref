/*
 *register users
 *login users
 *return users profile
 */

 const express = require("express"),
       router = express.Router(),
       {raw} = require("objection"),
       math = require("currency.js"),
       auth = require("../middleware/auth/auth"),
       User = require("../models/users"),
       Wallet = require("../models/wallet"),
       errors = require("../validators/errors"),
       vee = require("../validators/boxes");

    
router.post("/bet", auth, vee.v_bet_data, errors, async (req,res)=>{
    const box = req.box;

    const stake = req.body.stake,
          value = box.value;

    const wallet1 = await Wallet.query().findOne({user:req.user.id});

    const c = math(((stake * value) - stake),{precision:2}).value;

    await wallet1.$relatedQuery("streams").findOne({
            type:"spin"
    }).patch({
            total:raw("total + ?", c)
    });
    const a = await User.relatedQuery("boxes").for(req.user.id);
    res.json(a.map(i=>i.value))
})


router.get("/get", auth, async (req,res)=>{
      const boxes = await User.relatedQuery("boxes").for(req.user.id).delete();
      const nboxes = await User.relatedQuery("boxes")
                    .for(req.user.id)
                    .insertGraph([
                        {
                            loc:1
                        },
                        {
                            loc:2
                        },
                        {
                            loc:3
                        },
                        {
                            loc:4
                        },
                        {
                            loc:5
                        },
                        {
                            loc:6
                        },
                        {
                            loc:7
                        },
                        {
                            loc:8
                        },
                        {
                            loc:9
                        },
                        {
                            loc:10
                        },
                        {
                            loc:11
                        },
                        {
                            loc:12
                        },
                    ]);
      res.json(nboxes.map(i=>i.id))
});

module.exports = router;