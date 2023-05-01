const User = require("../../models/users"),
      Upline = require("../../models/upline");

module.exports = async (req,res) =>{
    const upline = await User.relatedQuery("upline").for(req.user.id);
    const downlines = await Upline.query().where("uplineID",req.user.id);
    const rr = await Promise.all(downlines.map(async (i)=>{
        const d = await User.query().findById(i.user);
        return {
            id:d.id,
            username:d.username,
            initiated:d.initiated
        }
    }));

    res.json({
        upline:{
            id:upline[0].uplineID,
            username:upline[0].username
        },
        downlines:rr
    });
}