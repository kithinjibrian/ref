
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {
        await User.query()
            .insertGraph({
                username: req.body.username,
                password: req.body.password,
                email:req.body.email,
                contact:req.body.contact,
                upline:[{
                    uplineID:req.Upline.uplineID,
                    username:req.Upline.username
                }],
                wallet:[{
                    total:0.0,
                    streams:[{
                        type:"videos"
                    },{
                        type:"trivia"
                    },{
                        type:"boxes"
                    },{
                        type:"referrals"
                    }]
                }]
            });
        res.json({type:"success",msg:[{msg:"User created successfully."}]});
    } catch(e) {
        console.log(e.data)
    }
};