const Tokens = require("../../models/tokens"),
      Auth = require("../../utils/auth");

const auth = new Auth({
    AccessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
    RefreshTokenSecret:process.env.REFRESH_TOKEN_SECRET
},Tokens);

module.exports = async (req, res) => {
   await auth.refresh(req.body.RefreshToken,(err,token)=>{
       if(!err) {
           res.json(token)
       } else {
           res.json(err)
       }
   })
};