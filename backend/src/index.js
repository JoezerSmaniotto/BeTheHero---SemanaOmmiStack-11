const express  = require('express'); // importa o express
const cors =require('cors'); 
const routes = require('./routes');

const app  = express();  // variavel que armazena a aplicação
  
app.use(cors()); // Com o Cors informa quem pode acessar minha aplicação 
app.use(express.json()); // Para entender que o body passado esta no formato json no meu insomia
app.use(routes);

app.listen(3333); // manda a variavel da aplicação ouvir a porta 3333
