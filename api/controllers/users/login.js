const Tokens = require("../../models/tokens"),
      Auth = require("../../utils/auth");

const auth = new Auth({
    AccessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
    RefreshTokenSecret:process.env.REFRESH_TOKEN_SECRET
},Tokens);

module.exports = async (req, res) => {
    const user = {
        username : req.User.username,
        id : req.User.id
    }
    res.json(await auth.login(user))
};