import './styles.css';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { obterDadosViaCEP } from '../../services/viaCEP.js';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import InputMask from 'react-input-mask';

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
  const [sucessoCliente, setSucessoCliente] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  let rua = ''
  let bairro = ''
  let cidade = ''

  async function onSubmit(e) {
    e.preventDefault();

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
      nome_cliente: nomeCliente,
      email_cliente: emailCliente,
      cpf_cliente: cpfCliente,
      telefone_cliente: telefoneCliente,
      cep: cepCliente,
      logradouro: (logradouroCliente || rua),
      bairro: (bairroCliente || bairro),
      cidade: (cidadeCliente || cidade),
      complemento: complementoCliente,
      referencia: ptRefCliente
    };

    setErro('');
    setCarregando(true);

    try {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cliente', {
        method: "POST",
        body: JSON.stringify(dadosFormCliente),
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });


      setCarregando(false);
      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados);
        return;
      }

      if (resposta.ok) {
        setSucessoCliente('Cliente cadastrado com sucesso.');
        setTimeout(() => {
          history.push('/listar-clientes');
        }, 2000);
      }
    } catch (error) {
      setErro(error.message);
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

    setBairroCliente('')
    setLogradouroCliente('')
    setCidadeCliente('')

    let cepTratado = cep

    if (cepTratado.length === 8 && cepTratado.indexOf('-') === -1) {
      cepTratado = cep.substr(0, 5) + '-' + cep.substr(5, 7)
      /*console.log(cepTratado)*/
    }
    setCepCliente(cepTratado)
    if (cepTratado.length === 9) {

      const dados = await obterDadosViaCEP(cepTratado);
      setCidadeCliente(dados.localidade)
      setBairroCliente(dados.bairro)
      setLogradouroCliente(dados.logradouro)
     /*  rua = dados.logradouro
      bairro = dados.bairro
      cidade = dados.localidade
      console.log(rua, bairro, cidade) */
    }

  }

  /* useEffect(() => {

    setCidadeCliente('');
    setBairroCliente('');
    setLogradouroCliente('');
      
    if(cepCliente.length === 9) {      
     carregarDadosPeloCEP(cepCliente);
    }

  }, [cepCliente]); */

  return (
    <form className='form-clientes' onSubmit={(e) => onSubmit(e)}>
      <div className='form-clientes-pt-1'>
        <label htmlFor='nomeCliente'>Nome</label>
        <input id='nomeCliente' type='text' value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
        <label htmlFor='emailCliente'>E-mail</label>
        <input id='emailCliente' type='email' value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
      </div>
      <div className='form-clientes-pt-2'>
        <div className='form-clientes-pt-2-1' >
          <label htmlFor='cpfCliente'>CPF</label>
          <InputMask mask="999.999.999-99" id='cpfCliente' maskplaceholder='222.222.222-22' value={cpfCliente} onChange={(e) => setCpfCliente(e.target.value)} />
          <label htmlFor='cepCliente'>CEP</label>
          <InputMask id='cepCliente' maxLength={9} value={cepCliente} onChange={(e) => carregarDadosPeloCEP(e.target.value)} />
          <label htmlFor='bairroCliente'>Bairro</label>
          <input id='bairroCliente' type='text' value={bairroCliente} onChange={(e) => setBairroCliente(e.target.value)} />
          <label htmlFor='complementoCliente'>Complemento</label>
          <input id='complementoCliente' type='text' value={complementoCliente} onChange={(e) => setComplementoCliente(e.target.value)} />
        </div>
        <div className='form-clientes-pt-2-2' >
          <label htmlFor='telefoneCliente'>Telefone</label>
          <InputMask mask='(99) 99999 9999' id='telefoneCliente' maskplaceholder='(99) 98765-4321' value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} />
          <label htmlFor='logradouroCliente'>Logradouro</label>
          <input id='logradouroCliente' type='text' value={logradouroCliente} onChange={(e) => setLogradouroCliente(e.target.value)} />
          <label htmlFor='cidadeCliente'>Cidade</label>
          <input id='cidadeCliente' type='text' value={cidadeCliente} onChange={(e) => setCidadeCliente(e.target.value)} />
          <label htmlFor='ponto-referenciaCliente'>Ponto de Referência</label>
          <input id='ponto-referenciaCliente' type='text' value={ptRefCliente} onChange={(e) => setPtRefCliente(e.target.value)} />
        </div>
      </div>
      <div className='form-clientes-pt-3'>
        <Link className='btn-cancelar' to='/listar-clientes'>Cancelar</Link>
        <button className='btn-submit' type='submit'>Adicionar Cliente</button>
      </div>
      <Backdrop className={classes.backdrop} open={carregando} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
        <Alert variant="filled" severity="error">{erro}</Alert>
      </Snackbar>
      <Snackbar open={sucessoCliente ? true : false} autoHideDuration={2000} onClose={(e) => fecharSucesso(e)}>
        <Alert variant="filled" severity="success">{sucessoCliente}</Alert>
      </Snackbar>
    </form>

  );
}

export default FormularioCliente;