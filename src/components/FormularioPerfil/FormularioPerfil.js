import './styles.css';
import view from '../../assets/view.svg';
import noView from '../../assets/no-view.svg';
import { useContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  }
}));

function FormularioPerfil({ setMostrarPerfil, dadosUsuario }) {
  const classes = useStyles();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState('');
  const {tokenStorage} = useContext(ContextoDeAutorizacao);
  const history = useHistory();

  useEffect(() => {
    setNome(dadosUsuario.nome);
    setEmail(dadosUsuario.email);
    setCpf(dadosUsuario.cpf);
    setTelefone(dadosUsuario.telefone);
  }, [dadosUsuario]);

  async function onSubmit(e) {

    if (!(email || nome)) {
      setErro('Favor preencher os campos de nome e e-mail.');
      return;
    }
    if (!nome) {
      setErro('Favor preencher o campo do nome.');
      return;
    }
    if (!email) {
      setErro('Favor preencher o campo de e-mail.');
      return;
    }

    const dadosForm = {};

    if (!senha) {
      dadosForm.nome = nome
      dadosForm.email = email
      dadosForm.telefone = telefone
      dadosForm.cpf = cpf
    } else {
      dadosForm.nome = nome
      dadosForm.email = email
      dadosForm.senha = senha
      dadosForm.telefone = telefone
      dadosForm.cpf = cpf
    }

    console.log(tokenStorage)

    setErro('');
    setCarregando(true);
    
    const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/usuario', {
      method: "PUT",
      body: JSON.stringify(dadosForm),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    setCarregando(false);

    if (!resposta.ok) {
      setErro('Deu merda');
      return;
    }

    if (resposta.ok) {
      setSucesso('Perfil atualizado com sucesso.');
      history.push('/home');
    }

  }

  const fecharErro = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErro(false);
  };

  const fecharSucesso = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSucesso(false);
  };

  return (
    <form className='container-formulario' onSubmit={(e) => onSubmit(e)}> {/*criar a funcao de submitar os dados*/}
      <p className='btn-fechar' onClick={() => setMostrarPerfil(false)}>X</p>
      <h4>{'//'} EDITAR USUÁRIO</h4>
      <label htmlFor='nome'>Nome</label>
      <input id='nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
      <label htmlFor='email'>E-mail</label>
      <input id='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className='container-input-nova-senha'>
        <label htmlFor='senha'>Senha</label>
        <input id='senha' type={verSenha ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} />
        <img className='icone-vista' src={verSenha ? view : noView} alt='icone-olho' onClick={() => setVerSenha(!verSenha)} />
      </div>
      <label htmlFor='cpf'>CPF</label>
      <input id='cpf' type='text' placeholder='xxx.xxx.xxx-xx' pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <label htmlFor='telefone'>Telefone</label>
      <input id='telefone' type='text' placeholder='(xx) xxxxx-xxxx' pattern="\(\d{2}\) \d{5}-\d{4}" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button className='btn-submit' type='submit'>Editar conta</button>
      <Backdrop className={classes.backdrop} open={carregando} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
        <Alert variant="filled" severity="error">{erro}</Alert>
      </Snackbar>
      <Snackbar open={sucesso ? true : false} autoHideDuration={5000} onClose={(e) => fecharSucesso(e)}>
        <Alert variant="filled" severity="success">{sucesso}</Alert>
      </Snackbar>
    </form>
  );
}

export default FormularioPerfil;