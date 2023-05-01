const User = require("../../models/users"),
      bcrypt = require("bcrypt");

const check = (field="id",parent="user",child="id",ignore=false) => {
    return async (req,res,next) => {
        const user = await User.query()
                    .findOne({
                        [field]:req[parent][child]
                    });
        
        if(user === undefined && ignore === false) {
            res.status(422).json({errors:[{
                    msg:"User does not exist."
                }]
            });
        } else if(user === undefined && ignore === true) {
            next();
        } else if(user !== undefined) {
            req.User = user;
            next();
        }
    };
}

const password = async (req,res,next) => {
    const og = req.body.password,
          dp = req.User.password;

    let bool = await bcrypt.compare(og,dp);

    if(!bool) {
        res.status(422).json({errors:[{
            msg:"Password is incorrect."
        }]
    });
    } else {
        next();
    }
}

module.exports = {check,password}