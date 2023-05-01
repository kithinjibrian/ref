/*
 *Define token models
 **/
 
 //Fetch modules
 const Model = require ("./init");
 
 //Extending the objection class
 class Token extends Model {
 
     //Return table name
    static get tableName(){
     return "tokens";
    }

 }
 
 
 //Export user model
 module.exports=Token;