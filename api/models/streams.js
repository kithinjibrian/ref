/*
 *Define token models
 **/
 
 //Fetch modules
 const { nanoid } = require("nanoid"),
        math = require("currency.js"),
        Model = require ("./init");
 
 //Extending the objection class
 class Streams extends Model {
 
     //Return table name
    static get tableName(){
     return "streams";
    }

    //insert id
    async $beforeInsert() {
        //Self reference
        const self = this;
        self.id = nanoid(18);
    }
 }
 
 
 //Export user model
 module.exports=Streams;