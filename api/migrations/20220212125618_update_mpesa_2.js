
exports.up = function(knex) {
  return knex.schema.table("mpesa",(table)=>{
      table.string("fbp");
  })
};

exports.down = function(knex) {
  return knex.schema.table("mpesa",(table)=>{
      table.dropColumn("fbp");
  })
};
