const { DateTime } = require("luxon"),
      { raw } = require("objection"),
      User = require("../../models/users");

module.exports = async (req, res) => {

const tx = await User.transaction(async(tx)=>{
    const user = await User.query(tx)
         .findById(req.user.id);

    const tier = await user.$relatedQuery("tiers",tx)
            .for(user.id)
            .insert({
                amount:req.body.amount,
                type:"1",
                touch:DateTime.now().toString(),
            });

    const wallet = await user.$relatedQuery("wallet",tx)
                    .for(user.id)
                    .patch({
                        total:raw("total - ?",req.body.amount)
                    })

})

res.json({type:"success",msg:[{msg:"package created successfully."}]});

};