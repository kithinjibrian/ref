
exports.up = function(knex) {
  return knex.schema.table("mpesa",(table)=>{
      table.string("ipAddress")
           .notNullable();
      table.string("userAgent")
               .notNullable();
      table.string("email")
               .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.table("mpesa",(table)=>{
      table.dropColumn("ipAddress");
      table.dropColumn("userAgent");
      table.dropColumn("email");
  })
};
