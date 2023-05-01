const {check} = require("express-validator"),
      User = require("../models/users");

const v_register_data = [
    check("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({min:3,max:20})
    .withMessage("Username too short or long. Accepted length is minimum 3 characters or maximum 20 characters.")
    .matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)             
    .withMessage("Invalid format for username. The only accepted characters are letters, numbers or these characters(- . _).")
    .bail()
    .custom((t)=>{
        return new Promise(async (resolve,reject)=>{
            const a = await User.query().findOne({username:t});
            if(a) {
                reject("Username already exist");
            } else {
                resolve("pass")
            }
        })
    }),
    
    check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:8})
    .withMessage("Password minimum length is 8 characters.")
    /*.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .withMessage("Weak password. Must contain a lowercase letter, uppercase letter, number and any of these special characters (!@#$%^&*).")*/,

    check("passwordConfirmation")
    .notEmpty()
    .withMessage("password confirmation is required.")
    .custom((value,{req})=>{
        return new Promise((resolve,reject)=>{
            if(value!==req.body.password) {
                reject("The password confirmed is wrong.")
            } else {
                resolve("pass")
            }
        })
    }),

    
    check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .normalizeEmail()
    .bail()
    .custom((t)=>{
        return new Promise(async (resolve,reject)=>{
            const a = await User.query().findOne({email:t});
            if(a) {
                reject("Email already exist");
            } else {
                resolve("pass")
            }
        })
    }),
    
    check("contact")
    .notEmpty()
    .withMessage("phone number is required")
    .bail()
    .custom((t)=>{
        return new Promise(async (resolve,reject)=>{
            const a = await User.query().findOne({contact:t});
            if(a) {
                reject("Contact already exist");
            } else {
                resolve("pass")
            }
        })
    })
];

const v_login_data =[
  
    check("username")
    .notEmpty()                               
    .withMessage("username is required"),
    
    check("password")
    .notEmpty()
    .withMessage("password is required")
]

module.exports = {
    v_register_data,
    v_login_data
}