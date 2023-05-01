/*
 *Define user models
 **/

// Fetch modules
  const bcrypt = require('bcrypt');
  const { nanoid } = require('nanoid')
const Model = require('./init');

// Extending the objection class
class User extends Model {
  // Return table name
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type:"object",
      required:["username","email","password","contact"],
      properties:{
        username:{type:"string",minLength:3,maxLength:20}
      }
    }
  }

  static get relationMappings() {
    const Wallet = require('./wallet'),
          Boxes = require('./boxes'),
          Tier = require("./tiers"),
          Upline = require('./upline');

    return {
      wallet: {
        relation: Model.HasOneRelation,
        modelClass: Wallet,
        join: {
          from: 'wallet.user',
          to: 'users.id',
        },
      },
      upline: {
        relation: Model.HasOneRelation,
        modelClass: Upline,
        join: {
          from: 'upline.user',
          to: 'users.id',
        },
      },
      tiers : {
        relation : Model.HasManyRelation,
        modelClass : Tier,
        join : {
          from: "tier.user",
          to: "users.id"
        }
      },
      boxes: {
        relation: Model.HasManyRelation,
        modelClass: Boxes,
        join: {
          from: 'boxes.user',
          to: 'users.id',
        },
      }
    }
  }

  // Hash password before save
  async $beforeInsert() {
    // Self reference
    const self = this
    self.id = nanoid(18)
    // Generate salt. 10 rounds
    const salt = await bcrypt.genSalt(10)
    // Generate hash for password
    const hash = await bcrypt.hash(self.password, salt)
    // Save hashed password
    this.password = hash
  }
}

// Export user model
module.exports = User
