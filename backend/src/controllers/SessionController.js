const connection = require('../database/connection'); // Importo a conexão com o banco de dados

module.exports = {
  async create(request, response){
    const { id } = request.body; // Id para falzer login bem atraves do corpo
    
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first(); // Assim com o frist retorno um nome e não array

    if(!ong){
      return response.status(400).json({error: 'No ONG fround with this ID'});
    }

    return response.json(ong);

  }, 

} 