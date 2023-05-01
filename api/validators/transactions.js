const {check} = require("express-validator"),
      Wallet = require("../models/wallet");

const v_checkout_data = [
    check("contact")
    .notEmpty()
    .withMessage("phone number is required"),

    check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .normalizeEmail(),

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .custom((t)=>{
        return new Promise((resolve,reject)=>{
            if(t!==1499){
                reject("Please note, the initiation fee is kshs 1499.")
            } else {
                resolve("pass")
            }
        })
    })
];

const v_wallet_deposit_data = [
    check("contact")
    .notEmpty()
    .withMessage("phone number is required"),

    check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .normalizeEmail(),

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
];

const v_wallet_withdraw_data = [

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .bail()
    .custom((value,{req})=>{
        return new Promise(async (resolve,reject)=>{
            const wallet = await Wallet.query().findOne({user:req.user.id});
            if(value<1000) {
                reject("You can't withdraw less than KES 1000")
            } else {
                if(value>wallet.total) {
                    reject("Insufficient balance.")
                } else {
                    resolve("pass")
                }
            }
        })
    })
];

const v_streams_deposit = [

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .bail()
    .custom((value,{req})=>{
        return new Promise(async (resolve,reject)=>{
            const wallet = await Wallet.query().findOne({user:req.user.id});
            if(value<=0) {
                reject("Amount cannot be less than or equal to zero")
            } else {
                if(value>wallet.total) {
                    reject("Insufficient balance.")
                } else {
                    resolve("pass")
                }
            }
        })
    }),

    check("type")
    .notEmpty()
    .withMessage("The stream type is required.")

];

const v_streams_withdraw = [
    
    check("type")
    .notEmpty()
    .withMessage("The stream type is required."),

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .bail()
    .custom((value,{req})=>{
        return new Promise(async (resolve,reject)=>{
            if(value<1000) {
                reject("You can't withdraw less than KES 1000")
            } else {
                const wallet = await Wallet.query().findOne({user:req.user.id});
            const stream = await wallet.$relatedQuery("streams").findOne({type:req.body.type});
                if(value>stream.total) {
                    reject("Insufficient balance.")
                } else {
                    resolve("pass")
                }
            }
        })
    })
];

module.exports = {
    v_checkout_data,
    v_wallet_deposit_data,
    v_wallet_withdraw_data,
    v_streams_deposit,
    v_streams_withdraw
}