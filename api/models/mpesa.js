/*
 *Define token models
 **/
 
 //Fetch modules
 const { nanoid } = require("nanoid");
const Model = require ("./init");
 
 //Extending the objection class
 class Mpesa extends Model {
 
     //Return table name
    static get tableName(){
     return "mpesa";
    }

    //insert id
    async $beforeInsert() {
        //Self reference
        const self = this;
        self.id = nanoid(18);
       }

 }
 
 
 //Export user model
 module.exports=Mpesa;