import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn} from 'react-icons/fi';  // icones do react

import api from '../../services/api';

import './style.css';

import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon (){
  const [id,setId] =  useState(''); // inicializa a varivel com valor vazio
  const history = useHistory();

  async function handleLogin (e){
    e.preventDefault();
  
    try{
      const response = await api.post('sessions',{id}); // rota, e obj nesta caso com id da ong que esta querendo logar
      console.log(response.data.name);
      localStorage.setItem('ongId',id); /*Preciso destes dados em toda a aplicação, salvo no storage do navegador*/ 
      localStorage.setItem('ongName',response.data.name); /*ID e nome em localstorage */
      history.push('/profile'); // envio o usuario para a rota profile
    
    }catch(err){
      alert('Falha no Login, tente novamente.')
    }

  }

  return(
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="Be the Hero"/>

          <form onSubmit={handleLogin}>
            <h1> Faça seu logon</h1>
            <input 
              placeholder="Sua ID"
              value={id}
              onChange={e=>setId(e.target.value)}  
            />
            <button  className="button" type="submit">Entrar</button>
           
            <Link className="back-link" to="/register"> 
              <FiLogIn size={16} color="#E02041"/>
              Não tenho Cadastro
            </Link>
          </form>
        </section>
    
        <img src={herosImg} alt="Heroes" />

      </div>
  );
  
}