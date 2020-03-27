const connection = require('../database/connection');

module.exports = {
  async index(request,response){
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count(); /// Assim sei o total de requistos para colocar no começo da página

    const  incidents = await connection('incidents').select('*')
      .join('ongs','ongs.id','=','incidents.ong_id')
      .limit(5)
      .offset((page-1)*5) // logic para pegar 5 post por página
      .select(['incidents.*',
              'ongs.name',
              'ongs.whatsapp',
              'ongs.city',
              'ongs.uf']);

      // Retotno o total de post da linha 7 aqui no cabecalho de reposta  
      response.header('X-Total-Count',count['count(*)']) 
    
    return response.json(incidents);
  },

  async create(request,response){
    const {title,description,value} =  request.body;
    const ong_id = request.headers.authorization; // Acesso o cabeçlho para pegar o id da ong autorizada
   
    const [id] = await connection('incidents').insert({ // Retorna um array de uma unica posição e uso desestruturação para pegar o id retornado da inserção
      title,
      description,
      value,
      ong_id,
    })

    return response.json({ id });

  },

  async delete(request,response){
    const {id} = request.params; // Id do incidente(uplicação) a ser excluída
    const ong_id = request.headers.authorization; // Acesso o cabeçlho para pegar o id da ong autorizada
    const incident = await connection('incidents')
    .where('id',id)
    .select('ong_id')
    .first();

    if(incident.ong_id  !== ong_id){
      return response.status(401).json({error:'Operation not permieted.'}); // 401 Não autorizado
    }

    await connection('incidents').where('id',id).delete(); // 1º do banco 2º id a variavle que tenho acesso que passo para comparação

    return response.status(204).send(); // 204 resposta de SUCESSO sõ que sem conteudo
                                        // Send apenas para enviar a respota sem corpo, Vazia.
  },
  
  

}; 