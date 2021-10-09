import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

function EditarCliente({ cliente, setMostrarPerfilCliente }) {

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
  const { tokenStorage } = useContext(ContextoDeAutorizacao);

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
      logradouro: logradouroCliente,
      bairro: bairroCliente,
      cidade: cidadeCliente,
      complemento: complementoCliente,
      referencia: ptRefCliente
    };

    setErro('');
    setCarregando(true);

    try {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cliente', {
        method: "PUT",
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
        setSucessoCliente('Cliente atualizado com sucesso.');
        setTimeout(() => {
          history.push('/listar-clientes');
        }, 2000);
      }
    } catch (error) {
      setErro(error.message);
    }

    e.preventDefault();

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
    setMostrarPerfilCliente(false)
  };

  async function carregarDadosPeloCEP(cep) {

    setBairroCliente('')
    setLogradouroCliente('')
    setCidadeCliente('')
    
    let cepTratado = cep

    if (cepTratado.length === 8 && cepTratado.indexOf('-') === -1) {
      cepTratado = cep.substr(0, 5) + '-' + cep.substr(5, 7)
      console.log("teste", cepTratado)
    }
    setCepCliente(cepTratado)
    if (cepTratado.length === 9) {

      const dados = await obterDadosViaCEP(cepTratado);
      setCidadeCliente(dados.localidade)
      setBairroCliente(dados.bairro)
      setLogradouroCliente(dados.logradouro)
      console.log("teste 2", cidadeCliente, bairroCliente, logradouroCliente)
     /*  rua = dados.logradouro
      bairro = dados.bairro
      cidade = dados.localidade
      console.log(rua, bairro, cidade) */
    }

  }

  useEffect(() => {
    setNomeCliente(cliente.nome_cliente);
    setEmailCliente(cliente.email_cliente);
    setCpfCliente(cliente.cpf_cliente);
    setTelefoneCliente(cliente.telefone_cliente);
    setCepCliente(cliente.cep);
    setLogradouroCliente(cliente.logradouro);
    setBairroCliente(cliente.bairro);
    setCidadeCliente(cliente.cidade);
    setComplementoCliente(cliente.complemento);
    setPtRefCliente(cliente.referencia);
  }, [cliente])

  return (
    <form className='form-clientes' onSubmit={(e) => onSubmit(e)}>
      <p className='btn-fechar-2' onClick={() => setMostrarPerfilCliente(false)}>X</p>
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
        <div className='btn-cancelar' onClick={() => setMostrarPerfilCliente(false)}>Cancelar</div>
        <button className='btn-submit' type='submit'>Editar Cliente</button>
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

export default EditarCliente;