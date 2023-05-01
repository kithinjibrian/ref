const Auth = require("../../utils/auth");

const auth = new Auth({
    AccessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
    RefreshTokenSecret:process.env.REFRESH_TOKEN_SECRET
});

module.exports = (req,res,next)=>{
    auth.verify(req.headers,(err,user)=>{
        if(!err) {
                req.user = user;
                next();
        } else {
            res.status(422).json(err)
        }
    })
}