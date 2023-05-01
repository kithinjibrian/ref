const { nanoid } = require("nanoid"),
       Mpesa = require("../../../models/mpesa"),
       Flw = require("flutterwave-node-v3");

const config = {
    public : process.env.FLUTTERWAVE_PUBLIC_KEY,
    secret : process.env.FLUTTERWAVE_SECRET_KEY
};

const flw = new Flw(config.public,config.secret);

module.exports =async (req,res) => {
    try {
        const pd = {
            tx_ref:nanoid(18),
            amount:req.body.amount,
            currency:"KES",
            email:req.body.email,
            phone_number:req.body.contact,
            fullname:req.user.username
        };
        const r = await flw.MobileMoney.mpesa(pd);
        if(r.status==="success") {
            const {
                data:{
                    id,
                    tx_ref,
                    amount,
                    fraud_status,
                    charge_type,
                    status
                }
            } = r;
            if(fraud_status==="ok" && charge_type==="normal") {
                const a = await Mpesa.query().insert({
                    _id:id,
                    tx_ref,
                    amount,
                    status,
                    userID:req.user.id,
                    contact:req.body.contact,
                    email:req.body.email,
                    ipAddress:req.headers['x-forwarded-for'],
                    userAgent:(req.headers['user-agent'].length<=255) ? req.headers['user-agent'] : req.headers['user-agent'].slice(0,255),
                    fbp:req.cookies['_fbp']
                });
                res.json({id:a.id});
            }
        } else {
            res.json(r);
        }
    } catch(e){
        console.log(e);
    }
}


