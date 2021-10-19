import './styles.css';
import { useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import lixeira from '../../assets/icone-lixeira.png';

function EditarCobranca({ fecharEdicaoDeCobranca, cobranca, setAtualizarDadosDeCobranca, atualizarDadosDeCobranca }) {

  const [listaClientes, setListaClientes] = useState([]);
  const [formNome, setFormNome] = useState('')
  const [formDescricao, setFormDescricao] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [formValor, setFormValor] = useState('');
  const [formVencimento, setFormVencimento] = useState('');
  const [sucessoCliente, setSucessoCliente] = useState('');
  const [carregarDados, setCarregarDados] = useState(false);
  const [erro, setErro] = useState("");
  const {tokenStorage } = useContext(ContextoDeAutorizacao);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);

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

    let formValorNumber = formValor.toString();
    formValorNumber = formValorNumber.replace(/[^0-9]/g, '');

    console.log('status', formStatus)

    const dadosFormCobranca = {
      nome_cliente: formNome,
      descricao: formDescricao,
      valor: Number(formValorNumber),
      data_vencimento: formVencimento,
      status: formStatus.toUpperCase()
    }

    console.log('enviado', dadosFormCobranca)

    const resposta = await fetch(`https://api-cubos-cobranca.herokuapp.com/cobranca/${cobranca.id_cobranca}`, {
      method: 'PUT',
      body: JSON.stringify(dadosFormCobranca),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      setErro(dados);
      return;
    }

    if (resposta.ok) {
      setSucessoCliente('Cobrança atualizada com sucesso.');
      setAtualizarDadosDeCobranca(!atualizarDadosDeCobranca)
      setTimeout(() => {
        fecharEdicaoDeCobranca()
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
        if (a.nome_cliente > b.nome_cliente) {
          return 1
        }
        if (a.nome_cliente < b.nome_cliente) {
          return -1
        }
        return 0
      })

      setListaClientes(listaOrdenada);
    }

    obterNomesClientes();
  }, [carregarDados, tokenStorage]);

  useEffect(() => {
    setFormNome(cobranca.nome_cliente);
    setFormDescricao(cobranca.descricao);
    setFormStatus(cobranca.status);
    setFormValor((cobranca.valor >= 100 ? cobranca.valor / 100 : cobranca.valor));
    setFormVencimento(cobranca.data_vencimento.substr(0, 10));
    console.log('recebido', cobranca)
  }, [cobranca])

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

  async function excluirCobranca() {
    const resposta = await fetch(`https://api-cubos-cobranca.herokuapp.com/cobranca/${cobranca.id_cobranca}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      setErro(dados);
      return;
    }

    if (resposta.ok) {
      setSucessoCliente('Cobrança excluída com sucesso.');
      setAtualizarDadosDeCobranca(!atualizarDadosDeCobranca);
      setTimeout(() => {
        fecharEdicaoDeCobranca()
      }, 2000);
    }   

  }

  return (
    <form className='form-cobranca' onSubmit={onSubmitCobranca} >
      <div className='container-form-pt1'>
        <label htmlFor='nome-cliente' onClick={setCarregarDados}>Cliente</label>
        <select id='nome-cliente' className='select-nome-cliente' required value={formNome} onChange={(e) => setFormNome(e.target.value)} >
          <option value="" disabled selected hidden>Selecione um cliente...</option>
          {listaClientes && listaClientes.map((cliente) => <option>{cliente.nome_cliente}</option>)}
        </select>
        <label htmlFor='descricao'>Descrição</label>
        <input type='text' id='descricao' className='descricao-cobranca' value={formDescricao} onChange={(e) => setFormDescricao(e.target.value)} />
        <p className='aviso'>A descrição informada será impressa no boleto.</p>
        <label htmlFor='status'>Status</label>
        <select id='status' className='status-da-cobranca' value={formStatus} onChange={(e) => setFormStatus(e.target.value)} required>
          <option >{formStatus}</option>
          <option >{formStatus === 'PENDENTE' ? 'PAGO' : 'PENDENTE'}</option>
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
          <input type='date' className='calendario' value={formVencimento} onChange={(e) => setFormVencimento(e.target.value)} />
        </div>
      </div>      
      <div className='container-exclusao'>
        <img src={lixeira} alt='icone-lixeira' onClick={() => setMostrarPopUp(!mostrarPopUp)} />
        <p onClick={() => setMostrarPopUp(!mostrarPopUp)}>Excluir cobrança</p>
        <div className={`${mostrarPopUp ? 'popUp' : 'display-off'}`}>
          <p>Apagar cobrança?</p>
          <div className='btn-sim-nao'>
            <div className='btn-sim' onClick={excluirCobranca}>Sim</div>
            <div className='btn-nao' onClick={() => setMostrarPopUp(!mostrarPopUp)}>Não</div>
          </div>
        </div>
      </div>
      <div className='container-form-pt3'>
        <p to='listar-cobrancas' className='btn-cancelar-cobranca' onClick={fecharEdicaoDeCobranca} >Cancelar</p>
        <button className='btn-submit-cobranca' type='submit'>Editar cobrança</button>
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

export default EditarCobranca;