const User = require("../../models/users");

module.exports = async (req, res) => {
    const user = await User.query()
            .findById(req.user.id)

    res.json({
        id:user.id,
        username:user.username,
        contact:user.contact,
        email:user.email,
        initiated:user.initiated
    })
};