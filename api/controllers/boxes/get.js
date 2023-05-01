const Boxes = require("../../models/boxes");

module.exports = async (req,res) => {
    const a = await Boxes.query()
    res.json(a.map(i=>i.tempID))
}