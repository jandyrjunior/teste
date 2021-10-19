import './styles.css';
import { useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { Link, useHistory } from 'react-router-dom'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function FormularioCobranca() {

  const [listaClientes, setListaClientes] = useState([]);
  const [formNome, setFormNome] = useState('')
  const [formDescricao, setFormDescricao] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [formValor, setFormValor] = useState('');
  const [formVencimento, setFormVencimento] = useState('');
  const [sucessoCliente, setSucessoCliente] = useState('');
  const [carregarDados, setCarregarDados] = useState(false);
  const [erro, setErro] = useState("");
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const history = useHistory();

  async function onSubmitCobranca(e) {
    e.preventDefault();
    
    if (!(formNome || formDescricao || formStatus || formValor || formVencimento)) {
      setErro('Os campos de nome, descricao, status, valor e vencimento são obrigatórios');
      return;
    }
    if (!formNome) {
      setErro('Favor preencher o campo nome.');
      return;
    }
    if (!formDescricao) {
      setErro('Favor preencher o campo descrição.');
      return;
    }
    if (!formStatus) {
      setErro('Favor preencher o campo statu.');
      return;
    }
    if (!formValor) {
      setErro('Favor preencher o campo valor.');
      return;
    }
    if (!formVencimento) {
      setErro('Favor preencher o campo vencimento.');
      return;
    }

    let formValorNumber = formValor;
    formValorNumber = formValorNumber.replace(/[^0-9]/g, '');

    const dadosFormCobranca = {
      nome_cliente: formNome,
      descricao: formDescricao,
      valor: Number(formValorNumber)*100,
      data_vencimento: formVencimento,
      status: formStatus.toUpperCase()
    }

    console.log(dadosFormCobranca)

    const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cobranca', {
      method: 'POST',
      body: JSON.stringify(dadosFormCobranca),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    const dados = await resposta.json();

    if(!resposta.ok) {
      setErro(dados);
      return;
    }

    if (resposta.ok) {
      setSucessoCliente('Cobrança cadastrada com sucesso.');
      setTimeout(() => {
        history.push('/listar-cobrancas');
      }, 2000);
    }
  }

  useEffect(() => {
    async function obterNomesClientes() {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/clientes', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      const listaOrdenada = dados.sort((a, b) => {
        if(a.nome_cliente > b.nome_cliente) {
          return 1
        }
        if(a.nome_cliente < b.nome_cliente) {
          return -1
        }
        return 0
      })

      setListaClientes(listaOrdenada);
    }

    obterNomesClientes();
  }, [carregarDados, tokenStorage]);

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

  return (
    <form className='form-cobranca' onSubmit={onSubmitCobranca} >
      <div className='container-form-pt1'>
        <label htmlFor='nome-cliente' onClick={setCarregarDados}>Cliente</label>
        <select id='nome-cliente' className='select-nome-cliente' required value={formNome} onChange={(e) => setFormNome(e.target.value)} >
          <option value="" disabled selected hidden>Selecione um cliente...</option>
          {listaClientes && listaClientes.map((cliente) => <option>{cliente.nome_cliente}</option>)}
        </select>
        <label htmlFor='descricao'>Descrição</label>
        <input type='text' id='descricao' className='descricao-cobranca' value={formDescricao} onChange={(e) => setFormDescricao(e.target.value)}/>
        <p className='aviso'>A descrição informada será impressa no boleto.</p>
        <label htmlFor='status'>Status</label>
        <select id='status' className='status-da-cobranca' required value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
          <option value="" disabled selected hidden>Selecione um status...</option>
          <option value='pago'>PAGO</option>
          <option value='pendente'>PENDENTE</option>
        </select>
      </div>
      <div className='container-form-pt2' >
        <div className='form-valor'>
          <label htmlFor='valor'>Valor</label>
          <CurrencyFormat
            id='valor'
            value={formValor}
            className='valor-cobranca'
            displayType='input'
            thousandSeparator='.'
            decimalSeparator=','
            prefix='R$ '
            decimalScale='2'
            allowNegative={false}
            onChange={(e) => setFormValor(e.target.value)}
          />
        </div>
        <div className='form-data'>
          <label htmlFor='vencimento'>Vencimento</label>
          <input type='date' className='calendario' value={formVencimento} onChange={(e) => setFormVencimento(e.target.value)}/>
        </div>
      </div>
      <div className='container-form-pt3'>
        <Link to='listar-cobrancas' className='btn-cancelar-cobranca' >Cancelar</Link>
        <button className='btn-submit-cobranca' type='submit'>Criar cobrança</button>
      </div>
      <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
        <Alert variant="filled" severity="error">{erro}</Alert>
      </Snackbar>
      <Snackbar open={sucessoCliente ? true : false} autoHideDuration={2000} onClose={(e) => fecharSucesso(e)}>
        <Alert variant="filled" severity="success">{sucessoCliente}</Alert>
      </Snackbar>
    </form>
  );
}

export default FormularioCobranca;