const { DateTime } = require("luxon"),
      { raw } = require("objection"),
      Orders = require("../../models/orders"),
      Wallet = require("../../models/wallet");


module.exports = async (req,res) => {
    const tx = await Orders.transaction(async(tx)=>{

        const orders = await Orders.query(tx)
                    .insert({
                        userid:req.user.id,
                        ordered:DateTime.now().toString(),
                        amount:req.body.amount
                    });

        const wallet = await Wallet.query(tx)
                    .findOne({
                        user:req.user.id
                    })
                    .patch({
                        total:raw("total - ?",req.body.amount)
                    })
    })

    res.json({type:"success",msg:[{msg:"Withdrawal successful, transaaction in progress."}]})
};