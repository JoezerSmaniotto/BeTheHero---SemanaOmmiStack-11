import React,{useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';  // icones do react

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register (){
  const [name,setName]=useState(''); //Como é um input de texto vou iniciar ele com valor vazio
  const [email,setEmail]=useState(''); 
  const [whatsapp,setWhatsapp]=useState(''); 
  const [city,setCity]=useState(''); 
  const [uf,setUf]=useState(''); 

  const history = useHistory(); // Serve para fazer a nevegção atraves de uma função JS, quando não posso cocoar o linl

  async function handleRegister(e){  
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try{
        const response = await api.post('/ongs',data); // Assim envio o conteudo para meu back para cadastar.
        alert(`Seu ID de Acesso ${response.data}`); // response.data.id
        history.push('/'); // Invio para o rota raiz

    }catch(err){
        alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/"> 
            <FiArrowLeft size={16} color="#E02041"/>
             Não tenho Cadastro
          </Link>

           
        </section>


        <form  onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e =>setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          
          />
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e=>setWhatsapp(e.target.value)}
          />
          
          <div className="input-grup">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e=>setCity(e.target.value)}  
            />
            <input 
              placeholder="UF" 
              style={{width:80}}
              value={uf}
              onChange={e=>setUf(e.target.value)}

            /> 
             {/* A 1º {} no Style indica que irei usar javaScript dentro do css a 2º {} indica que irei usar uma objeto JS */}

          </div>
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      
      </div> 
    </div>
  );
}

