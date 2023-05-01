const bcrypt = require('bcrypt'),
      User = require("../../models/users");

module.exports = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash("@cloud360", salt)
    const user = await User.query()
            .findById("OctKQ7792vSooCMfNs")
            .patch({
                password:hash
            })

    res.json({0:0})
};