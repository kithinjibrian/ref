
const User = require("../../models/users");

module.exports = async (req, res) => {
    const a = await User.query().withGraphFetched("[wallet.[streams],upline]")
    res.json(a)
};