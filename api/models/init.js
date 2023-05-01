/*
 *initialize objection
 *Take knex
 **/
 
 // fetch modules
 const config=require("../knexfile"),
        knex=require("knex")(config["production"]),
        {Model}=require("objection");

//  objection model takes knex instance
Model.knex(knex);

//  Export objection model
module.exports=Model;