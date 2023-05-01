/*
 *Define token models
 **/
 
 //Fetch modules
 const { nanoid } = require("nanoid"),
        math = require("currency.js"),
        Model = require ("./init");
 
 //Extending the objection class
 class Boxes extends Model {
 
     //Return table name
    static get tableName(){
     return "boxes";
    }

    //insert id
    async $beforeInsert() {
        //Self reference
        const self = this;
        self.id = nanoid(18);
        const min = 0,
              max  = 1.5;
        self.value = math((Math.random() * (max - min) + min),{precision:1}).value
    }
 }
 
 
 //Export user model
 module.exports=Boxes;