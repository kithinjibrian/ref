/*
 *register users
 *login users
 *return users profile
 */

 const express = require("express"),
       router = express.Router(),
       {raw} = require("objection"),
       math = require("currency.js"),
       mpesa = require("../controllers/transaction/deposit/mpesa"),
       all = require("../controllers/wallet/all"),
       order = require("../controllers/wallet/orders"),
       auth = require("../middleware/auth/auth"),
       vee = require("../validators/transactions"),
       errors = require("../validators/errors"),
       Wallet = require("../models/wallet");


router.get("/", auth, all);

router.post("/checkout", vee.v_checkout_data, errors, auth, mpesa);

router.post("/deposit", vee.v_wallet_deposit_data, errors, auth, mpesa);

router.post("/order",auth , vee.v_wallet_withdraw_data, errors, order);

router.post("/deposit/other", auth, vee.v_streams_deposit, errors, async (req,res)=>{
      const wallet = await Wallet.query().findOne({user:req.user.id});

      const tx = await Wallet.transaction(async t=>{
            const stream = await wallet.$relatedQuery("streams",t)
                        .findOne({type:req.body.type})
                        .patch({
                              total:raw("total + ?",math(req.body.amount,{precision:2}).value)
                        });

            const _wallet = await wallet.$query(t)
                        .patch({
                              total:raw("total - ?",math(req.body.amount,{precision:2}).value)
                        });
      })

      res.json({})
})

router.post("/withdraw/other", auth, vee.v_streams_withdraw, errors, async (req,res)=>{
      const wallet = await Wallet.query().findOne({user:req.user.id});

      const tx = await Wallet.transaction(async t=>{
            const stream = await wallet.$relatedQuery("streams",t)
                        .findOne({type:req.body.type})
                        .patch({
                              total:raw("total - ?",math(req.body.amount,{precision:2}).value)
                        });

            const _wallet = await wallet.$query(t)
                        .patch({
                              total:raw("total + ?",math(req.body.amount,{precision:2}).value)
                        });
      })

      res.json({})
})

module.exports = router;