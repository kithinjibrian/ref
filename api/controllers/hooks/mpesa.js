const Mpesa = require("../../models/mpesa"),
      User = require("../../models/users"),
      Wallet = require("../../models/wallet"),
      {raw} = require("objection"),
      fb = require("../../utils/fb");

module.exports = async (req,res) => {
    const {
        id,
        tx_ref,
        amount,
        status
    } = req.body.data;

    if(status==="successful") {
        try {
            const a = await Mpesa.query().findOne({_id:id,tx_ref});
            if(!a.verified) {
                
                await a.$query().patch({verified:true,status});

                const user = await User.query().findById(a.userID);

                if(!user.initiated) {
                    const tx = await User.transaction(async (t) => {
                        const admin = await User.query(t).findOne({role:"admin"});

                        //pay admin
                        await admin.$relatedQuery("wallet",t).for(admin.id).patch({
                            total:raw("total + ?",749)
                        });

                        //pay upline
                        const upline = await User.relatedQuery("upline",t).for(a.userID).findOne({user:a.userID});

                        const uplineUser = await User.query(t).findById(upline.uplineID);

                        const uplineWallet = await Wallet.query(t).findOne({user:uplineUser.id});

                        await uplineWallet.$relatedQuery("streams",t).findOne({type:"referrals"}).patch({
                            total:raw("total + ?",750)
                        });

                        //initiate the user
                        await User.query(t).findById(a.userID).patch({
                            initiated:true
                        });

                        fb({
                            userID:a.userID,
                            amount,
                            ipAddress:a.ipAddress,
                            userAgent:a.userAgent,
                            contact:a.contact,
                            email:a.email,
                            fbp:a.fbp,
                            id:a.id
                        },(e)=>res.json({code:0}));
                    })
                } else {
                    await Wallet.query().findOne({user:a.userID}).patch({
                        total:raw("total + ?",amount)
                    });
                    res.json({code:0})
                }
            }
        } catch(e) {
            console.log(e)
        }
    }
}