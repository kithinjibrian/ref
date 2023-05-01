const User = require("../../models/users");

module.exports = async (req,res,next) => {
    const admin = await User.query().findOne({role:"admin"});    
    if(req.body.uplineID!==null) {
        const upline = await User.query().findById(req.body.uplineID);
        if(upline !== undefined) {
            req.Upline = {
                uplineID:upline.id,
                username:upline.username
            };
        } else {
            req.Upline = {
                uplineID:admin.id,
                username:admin.username
            }; 
        }
    } else {
        req.Upline = {
            uplineID:admin.id,
            username:admin.username
        };
    }
    next()
}