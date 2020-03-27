
exports.up = function(knex) { // Up responsvel pelal criaçãi da tabela
  return knex.schema.createTable('ongs',function(table){ // 
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf',2).notNullable(); // uf',2 DOIS é tamanho
  });
  
};

exports.down = function(knex) {  // Donw responsavel por desfazer caso de um erro
  return knex.schema.dropTanble('ongs');
  
};
