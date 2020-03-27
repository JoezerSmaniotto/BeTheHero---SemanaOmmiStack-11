const knex = require('knex'); 
const configuration = require('../../knexfile'); // COnfiguração de dados

const connection = knex(configuration.development); // Conexão de desenvolvimento

module.exports = connection; 