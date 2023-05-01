/*
 *Define token models
 **/
 
 //Fetch modules
 const { nanoid } = require("nanoid"),
        Model = require ("./init");
 
 //Extending the objection class
 class Upline extends Model {
 
     //Return table name
    static get tableName(){
     return "upline";
    }

    //insert id
    async $beforeInsert() {
        //Self reference
        const self = this;
        self.id = nanoid(18);
    }
 }
 
 
 //Export user model
 module.exports=Upline;