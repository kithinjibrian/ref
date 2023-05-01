const {check} = require("express-validator"),
      Wallet = require("../models/wallet"),
      User = require("../models/users");

const v_bet_data = [
    check("id")
    .notEmpty()
    .withMessage("The magic box id is required")
    .custom((id,{req})=>{
        return new Promise(async (resolve,reject)=>{
            const box = await User.relatedQuery("boxes")
                        .for(req.user.id)
                        .findById(id);
            
            if(box===undefined) {
                reject("This magic box does not exist.")
            } else {
                req.box = box;
                resolve("pass")
            }
        })
    }),

    check("stake")
    .notEmpty()
    .withMessage("Stake is required")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .custom((stake,{req})=>{
        return new Promise(async (resolve,reject)=>{
            if(stake<=0) {
                reject("Stake must be greater than zero.")
            } else {
                const wallet = await Wallet.query().findOne({user:req.user.id});
                const stream = await wallet.$relatedQuery("streams").findOne({type:"boxes"});
                if(stake>stream.total) {
                    reject("Insufficient balance.")
                } else {
                    resolve("pass");
                }
            }
        })
    })
];

module.exports = {
    v_bet_data
}