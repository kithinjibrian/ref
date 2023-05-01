const { DateTime } = require("luxon");


module.exports = (n,msg) => {
    return (req,res,next) => {
        const day = DateTime.now();
        if(day.weekday==n) {
            next()
        } else {
            res.status(422).json({errors:[{
                msg:msg
            }]})
        }
    }
}