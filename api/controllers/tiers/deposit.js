const { raw } = require("objection"),
      math = require("currency.js"),
      Tier = require("../../models/tiers"),
      Wallet = require("../../models/wallet");

module.exports = async (req, res) => {
    const tier = req.tier;

    const wallet = await Wallet.query()
                    .findOne({user:req.user.id});

    const d = math(req.body.amount);

    const tx = await Wallet.transaction(async(tx)=>{
        const u_tier = await tier.$query(tx)
                        .patch({
                            amount:raw("amount + ?",d.value)
                        });

        const u_wallet = await wallet.$query(tx)
                        .patch({
                            total:raw("total - ?",d.value)
                        });
    });

    res.json({type:"success",msg:[{msg:"patch successful"}]})
};