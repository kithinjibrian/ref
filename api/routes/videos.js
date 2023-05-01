/*
 *register users
 *login users
 *return users profile
 */

 const express = require("express"),
       router = express.Router(),
       {raw} = require("objection"),
       auth = require("../middleware/auth/auth"),
       Wallet = require("../models/wallet"),
       Records = require("../models/records");

const isWatched = async (req,res,next) => {
      const a = await Records.query().findOne({userID:req.user.id,type:"videos"});
      if(a) {
            res.status(422).json({errors:[{
                  msg:"You already watched this video."
            }]})
      } else {
            next()
      }
};

router.get("/src",auth,(req,res)=>{
      res.json({src:"https://vjs.zencdn.net/v/oceans.mp4"})
})

router.post("/played", auth, isWatched, async (req,res)=>{
      const wallet = await Wallet.query().findOne({user:req.user.id});
      await wallet.$relatedQuery("streams").findOne({
            type:"videos"
      }).patch({
            total:raw("total + ?",50)
      });

      await Records.query().insert({
            userID:req.user.id,
            type:"videos",
            status:"watched"
      });

      res.json({})
});

module.exports = router;