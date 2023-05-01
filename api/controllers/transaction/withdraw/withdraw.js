const {nanoid} = require("nanoid"),
      Flw = require("flutterwave-node-v3");

const config = {
    public : process.env.FLUTTERWAVE_PUBLIC_KEY,
    secret : process.env.FLUTTERWAVE_SECRET_KEY
};

const flw = new Flw(config.public,config.secret);

module.exports = async (req,res) => {
    try {
        const pd = {
            "account_bank": "MPS",
            "account_number": req.body.contact,
            "amount": req.body.amount,
            "narration": `New transfer ref no${nanoid(5)}`,
            "currency": "KES",
            "reference": nanoid(18),
            "beneficiary_name": req.body.fname,
            "meta": {
                "email":req.body.email,
                "sender": "DENNIS MUENDO",
                "sender_country": "KE",
                "mobile_number": "+254777169007"
            }
        };
    } catch(e) {

    }
}