const User = require("../../models/users");

module.exports = async (req,res) => {
    const wallet = await User.relatedQuery("wallet").for(req.user.id).withGraphFetched("streams");
    res.json(wallet[0])
}