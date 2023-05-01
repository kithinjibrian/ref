const User = require("../../models/users");


module.exports = async (req,res) => {
    const user = await User.query()
                .findById(req.user.id);
    const tiers = await user.$relatedQuery("tiers");
    res.json(tiers);
};