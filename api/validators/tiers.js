const {check} = require("express-validator"),
      Wallet = require("../models/wallet"),
      Tier = require("../models/tiers");


const v_tier_deposit = [

    check("id")
    .notEmpty()
    .withMessage("The package id is required")
    .custom((id,{req})=>{
        return new Promise(async (resolve,reject)=>{
            const tier = await Tier.query()
                        .findById(id);
            
            if(tier===undefined) {
                reject("This package does not exist.")
            } else {
                req.tier = tier;
                resolve("pass")
            }
        })
    }),

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
    })
];

const v_tier_withdraw = [

    check("id")
    .notEmpty()
    .withMessage("The package id is required")
    .custom((id,{req})=>{
        return new Promise(async (resolve,reject)=>{
            const tier = await Tier.query()
                        .findById(id);
            
            if(tier===undefined) {
                reject("This package does not exist.")
            } else {
                req.tier = tier;
                resolve("pass")
            }
        })
    }),

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .bail()
    .custom((value,{req})=>{
        return new Promise(async (resolve,reject)=>{
            if(value<=0) {
                reject("Amount must be greater than zero.")
            } else {
                if(value>req.tier.interest) {
                    reject("Insufficient balance.")
                } else {
                     resolve('pass');
                }
            }
        })
    })
];

const v_enroll_data = [

    check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat()
    .withMessage("Unexpected character type.")
    .toFloat()
    .bail()
    .custom((v,{req})=>{
        return new Promise(async (resolve,reject)=>{
            const wallet = await Wallet.query().findOne({user:req.user.id});
            if(v>wallet.total) {
                reject("Insufficient balance.")
            } else {
                resolve("pass")
            }
        })
    })
]

module.exports = {
    v_tier_deposit,
    v_tier_withdraw,
    v_enroll_data
}