/*
 *Define token models
 **/
 
 //Fetch modules
 const { nanoid } = require("nanoid"),
        math = require("currency.js"),
        Model = require ("./init");
 
 //Extending the objection class
 class Wallet extends Model {
 
     //Return table name
    static get tableName(){
     return "wallet";
    }

    static get relationMappings() {
        const Streams = require('./streams')
    
        return {
          streams: {
            relation: Model.HasManyRelation,
            modelClass: Streams,
            join: {
              from: 'streams.walletID',
              to: 'wallet.id',
            },
          },
        }
      }

    //insert id
    async $beforeInsert() {
        //Self reference
        const self = this;
        self.id = nanoid(18);
       }

    async $beforeUpdate() {
        const self = this;
        self.total = math(self.total,{precision:2}).value
    }
 }
 
 
 //Export user model
 module.exports=Wallet;