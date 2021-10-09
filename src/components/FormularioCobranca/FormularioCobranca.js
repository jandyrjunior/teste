import './styles.css';
import { useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import {Link} from 'react-router-dom'



function FormularioCobranca() {

  const [listaClientes, setListaClientes] = useState([]);
  const [carregarDados, setCarregarDados] = useState(false)
  const { tokenStorage } = useContext(ContextoDeAutorizacao);

  function onSubmitCobranca() {

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
      setListaClientes([dados]);
    }

    obterNomesClientes();
  }, [carregarDados, tokenStorage]);

  return (
    <form className='form-cobranca' onSubmit={onSubmitCobranca} >
      <div className='container-form-pt1'>
        <label htmlFor='nome-cliente' onClick={setCarregarDados}>Cliente</label>
        <select id='nome-cliente' className='select-nome-cliente' required>
          <option value="" disabled selected hidden>Selecione um cliente...</option>
          {listaClientes && listaClientes.map((cliente) => <option>{cliente.nome_cliente}</option>)}
        </select>
        <label htmlFor='descricao'>Descrição</label>
        <input type='text' id='descricao' className='descricao-cobranca' />
        <p className='aviso'>A descrição informada será impressa no boleto.</p>
        <label htmlFor='status' onClick={setCarregarDados}>Status</label>
        <select id='status' className='status-da-cobranca' required>
          <option value="" disabled selected hidden>Selecione um status...</option>
          <option value='pago'>Pago</option>
          <option value='pendente'>Pendente</option>
          <option value='vencido'>Vencido</option>
        </select>
      </div>
      <div className='container-form-pt2' >
        <div className='form-valor'>
          <label htmlFor='valor'>Valor</label>
          <CurrencyFormat
            id='valor'
            value=''
            className='valor-cobranca'
            displayType='input'
            thousandSeparator='.'
            decimalSeparator=','
            prefix='R$ '
            decimalScale='2'
            allowNegative={false}
          />
        </div>
        <div className='form-data'>
          <label htmlFor='vencimento'>Vencimento</label>
          <input type='date' className='calendario' placeholder=''/>
        </div>
      </div>
      <div className='container-form-pt3'>
        <Link to='listar-cobrancas' className='btn-cancelar-cobranca' >Cancelar</Link>
        <button className='btn-submit-cobranca' type='submit'>Criar cobrança</button>
      </div>
    </form>
  );
}

export default FormularioCobranca;