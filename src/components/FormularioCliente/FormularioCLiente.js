import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { obterDadosViaCEP }  from '../../services/viaCEP.js';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  }
}));

function FormularioCliente() {

  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [cepCliente, setCepCliente] = useState('');
  const [logradouroCliente, setLogradouroCliente] = useState('');
  const [bairroCliente, setBairroCliente] = useState('');
  const [cidadeCliente, setCidadeCliente] = useState('');
  const [complementoCliente, setComplementoCliente] = useState('');
  const [ptRefCliente, setPtRefCliente] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucessoCliente, setSucessoCliente] = useState('');
  const {tokenStorage} = useContext(ContextoDeAutorizacao);

  async function onSubmit(e) {

    if (!(nomeCliente || emailCliente || cpfCliente || telefoneCliente)) {
      setErro('Os campos de nome, telefone, e-mail e CPF são obrigatórios');
      return;
    }
    if (!nomeCliente) {
      setErro('Favor preencher o campo nome.');
      return;
    }
    if (!emailCliente) {
      setErro('Favor preencher o campo e-mail.');
      return;
    }
    if (!cpfCliente) {
      setErro('Favor preencher o campo CPF.');
      return;
    }
    if (!telefoneCliente) {
      setErro('Favor preencher o campo telefone.');
      return;
    }
    
    const dadosFormCliente = {
      nome: nomeCliente,
      email: emailCliente,
      cpf: cpfCliente,
      telefone: telefoneCliente,
      cep: cepCliente,
      logradouro: logradouroCliente,
      bairro: bairroCliente,
      cidade: cidadeCliente,
      complemento: complementoCliente,
      referencia: ptRefCliente
    };

    console.log(tokenStorage);
    console.log(dadosFormCliente);

    setErro('');
    setCarregando(true);

    const resposta = await fetch(`${process.env.REACT_APP_API_URL}/cliente`, {
      method: "POST",
      body: JSON.stringify(dadosFormCliente),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    setCarregando(false);
    console.log(resposta)
    if (!resposta.ok) {
      setErro('Deu merda');
      return;
    }

    if (resposta.ok) {
      setSucessoCliente('Cliente cadastrado com sucesso.');
      history.push('/home');
      return
    }

  }

  const fecharErro = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErro('');
  };
  
  const fecharSucesso = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSucessoCliente(false);
  };

  async function carregarDadosPeloCEP(cep) {

    setCidadeCliente('');
    setBairroCliente('');
    setLogradouroCliente('');

    if (cep.length === 9) {
      const dadosCarregados = await obterDadosViaCEP(cep);
      setCidadeCliente(dadosCarregados.localidade);
      setBairroCliente(dadosCarregados.bairro);
      setLogradouroCliente(dadosCarregados.logradouro);
    }
  }

  useEffect(() => {
    carregarDadosPeloCEP(cepCliente);
  }, [cepCliente]);

  return (
    <form className='form-clientes' onSubmit={(e) => onSubmit(e)}>
      <div className='form-clientes-pt-1'>
        <label htmlFor='nomeCliente'>Nome</label>
        <input id='nomeCliente' type='text' value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
        <label htmlFor='emailCliente'>E-mail</label>
        <input id='emailCliente' type='email' placeholder='exemplo@email.com' value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
      </div>
      <div className='form-clientes-pt-2'>
        <div className='form-clientes-pt-2-1' >
          <label htmlFor='cpfCliente'>CPF</label>
          <input id='cpfCliente' type='text' maxLength='14' placeholder='xxx.xxx.xxx-xx' pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" value={cpfCliente} onChange={(e) => setCpfCliente(e.target.value)} />
          <label htmlFor='cepCliente'>CEP</label>
          <input id='cepCliente' maxLength='9' type='text' placeholder='xxxxx-xxx' pattern="\d{5}\d{-}\d{3}" value={cepCliente} onChange={(e) => setCepCliente(e.target.value)} />
          <label htmlFor='bairroCliente'>Bairro</label>
          <input id='bairroCliente' type='text' value={bairroCliente} onChange={(e) => setBairroCliente(e.target.value)} />
          <label htmlFor='complementoCliente'>Complemento</label>
          <input id='complementoCliente' type='text' value={complementoCliente} onChange={(e) => setComplementoCliente(e.target.value)} />
        </div>
        <div className='form-clientes-pt-2-2' >
          <label htmlFor='telefoneCliente'>Telefone</label>
          <input id='telefoneCliente' type='text' maxLength='15' placeholder='(xx) xxxxx-xxxx' pattern="\(\d{2}\) \d{5}-\d{4}" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} />
          <label htmlFor='logradouroCliente'>Logradouro</label>
          <input id='logradouroCliente' type='text' value={logradouroCliente} onChange={(e) => setLogradouroCliente(e.target.value)} />
          <label htmlFor='cidadeCliente'>Cidade</label>
          <input id='cidadeCliente' type='text' value={cidadeCliente} onChange={(e) => setCidadeCliente(e.target.value)} />
          <label htmlFor='ponto-referenciaCliente'>Ponto de Referência</label>
          <input id='ponto-referenciaCliente' type='text' value={ptRefCliente} onChange={(e) => setPtRefCliente(e.target.value)} />
        </div>
      </div>
      <div className='form-clientes-pt-3'>
        <Link className='btn-cancelar' to='/home'>Cancelar</Link>
        <button className='btn-submit' type='submit'>Adicionar Cliente</button>
      </div>
      <Backdrop className={classes.backdrop} open={carregando} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
        <Alert severity="error">{erro}</Alert>
      </Snackbar>
      <Snackbar open={sucessoCliente ? true : false} autoHideDuration={5000} onClose={(e) => fecharSucesso(e)}>
        <Alert severity="success">{sucessoCliente}</Alert>
      </Snackbar>
    </form>

  );
}

export default FormularioCliente;