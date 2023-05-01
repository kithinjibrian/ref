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
       Records = require("../models/records"),
       errors = require("../validators/errors"),
       vee = require("../validators/trivia");

const isAttempted = async (req,res,next) => {
    const a = await Records.query().findOne({userID:req.user.id,type:"trivia"});
    if(a) {
        res.status(422).json({errors:[{
            msg:"You already answered this trivia question."
        }]})
    } else {
        next()
    }
};

const q = [{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
},{
    q:"Who was the first president of kenya",
    A:"Uhuru Kenyatta",
    B:"Mwai Kibaki",
    C:"Gideon Moi",
    D:"Jomo Kenyatta",
    an:"D"
}]

router.get("/questions",auth, async (req,res)=>{
    res.json(q.map(i=>{
        return {
            q:i.q,
            A:i.A,
            B:i.B,
            C:i.C,
            D:i.D
        }
    }))
});

router.post("/submit", vee.v_trivia_data, errors, auth, isAttempted, async(req,res)=>{
    const an = q.map(i=>i.an);
    const san = req.body.answers;
    const a = san.filter(x=>!an.includes(x))
    console.log(a.length)
    if(a.length<=2) {
      const wallet = await Wallet.query().findOne({user:req.user.id});
      await wallet.$relatedQuery("streams").findOne({
            type:"trivia"
      }).patch({
            total:raw("total + ?",50)
      });

      await Records.query().insert({
        userID:req.user.id,
        type:"trivia",
        status:"answered"
  });
    }
    res.json(q.map((a)=>a[a.an]))
})

module.exports = router;