
exports.up = function(knex) {
  return knex.schema.createTable('incidents',function(table){ // 
    table.increments(); 

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ong_id').notNullable();// Relacionamento, saber qual ong criou o incidente
    
    table.foreign('ong_id').references('id').inTable('ongs'); // Chave primaria
  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
  
};
