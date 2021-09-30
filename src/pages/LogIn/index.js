import './styles.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import view from '../../assets/view.svg';
import noView from '../../assets/no-view.svg';
import logo from '../../assets/logo.png';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  }
}));

function LogIn() {

  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [verSenha, setVerSenha] = useState(false);
  const history = useHistory();
  const { setToken, setTokenStorage } = useContext(ContextoDeAutorizacao);

  async function onSubmit(data) { 
    
    if (!(data.email || data.senha)) {
      
      setErro('Favor preencher os campos de e-mail e senha.');
      return;
  
    }
    if (!data.email) {
      
      setErro('Favor preencher o campo de e-mail.');
      return;
  
    }
    if (!data.senha) {
      
      setErro('Favor preencher o campo de senha.');
      return;
  
    }
  
    setErro("");
    setCarregando(true);
  
    const resposta = await fetch('http://localhost:3000/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    });
    
    setCarregando(false);
    
    const dados = await resposta.json();
  
    if(!resposta.ok) {
      setErro('Email ou senha incorreta.');
      return;
    }
  
    if (resposta.ok) {
      setToken(dados.token);
      setTokenStorage(dados.token);
      history.push('/home');
      return;
    }
  }
  
  const fecharErro = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setErro(false);
  };

  return (
    <div className='container-login'>
      <form className='card-login' onSubmit={handleSubmit(onSubmit)}>
        <img src={logo} alt='logo-cubos' />
        <label htmlFor='email'>E-mail</label>
        <input id='email' placeholder='exemplo@email.com' type='email' {...register('email')} />
        <div className='container-input-senha'>
          <label htmlFor='senha'>Senha</label>
          <input id='senha' type={verSenha ? 'text' : 'password'} {...register('senha')} />
          <img className='icone-vista' src={verSenha ? view : noView} alt='icone-olho' onClick={() => setVerSenha(!verSenha)} />
        </div>
        <button type='submit'>Entrar</button>
      </form>
      <p>Não tem uma conta? <Link className='link' to='/cadastro'>Cadastre-se</Link></p>
      <Backdrop className={classes.backdrop} open={carregando} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
        <Alert severity="error">{erro}</Alert>
      </Snackbar>
    </div>
  );
}

export default LogIn;