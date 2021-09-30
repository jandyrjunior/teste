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
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  }
}));

function Cadastro() {

  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [verSenha, setVerSenha] = useState(false);
  const history = useHistory();

  async function onSubmit(data) {

    if (!(data.email || data.senha || data.nome)) {

      setErro('Favor preencher os campos de nome, e-mail e senha.');
      return;

    }
    if (!data.nome) {

      setErro('Favor preencher o campo do nome.');
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

    const resposta = await fetch('http://localhost:3000/cadastrar', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    });

    setCarregando(false);

    if (resposta.ok) {
      history.push('/');
      return;
    }

    const dados = await resposta.json();
    setErro(dados);
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
        <label htmlFor='nome'>Nome</label>
        <input id='nome' placeholder='Digite seu nome' type='text' {...register('nome')} />
        <label htmlFor='email'>E-mail</label>
        <input id='email' placeholder='exemplo@email.com' type='email' {...register('email')} />
        <div className='container-input-senha'>
          <label htmlFor='senha'>Senha</label>
          <input id='senha' placeholder='digite sua senha' type={verSenha ? 'text' : 'password'} {...register('senha')} />
          <img className='icone-vista' src={verSenha ? view : noView} alt='icone-olho' onClick={() => setVerSenha(!verSenha)} />
        </div>
        <button type='submit' >Criar conta</button>
      </form>
      <p>Já possui uma conta? <Link className='link' to='/'>Acesse agora!</Link></p>
      <Backdrop className={classes.backdrop} open={carregando} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
        <Alert severity="error">{erro}</Alert>
      </Snackbar>
    </div>
  );
}

export default Cadastro;