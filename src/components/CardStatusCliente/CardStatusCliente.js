import './styles.css';
import cliente from '../../assets/users.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { useHistory } from 'react-router';

function CardStatusCliente() {

  const [statusCliente, setStatusCliente] = useState();
  const {tokenStorage, setFiltroC, setFiltroS } = useContext(ContextoDeAutorizacao);
  const history = useHistory()

  function filtroClienteEmDia(){
    setFiltroC('clientes');
    setFiltroS('em dia');
    history.push('/relatorio')
  }

  function filtroClienteInadimplente(){
    setFiltroC('clientes');
    setFiltroS('inadimplentes');
    history.push('/relatorio')
  }

  useEffect(() => {
    async function obterStatusCliente() {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/clientes/contador', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      
      setStatusCliente(dados);
    }

    obterStatusCliente();
  }, [tokenStorage]);

  return (
    <div className='card-cliente'>
      <div className='topo-card-cliente'>
        <img src={cliente} alt='icone-cliente' />
        Clientes
      </div>
      <div className='clientes-em-dia' onClick={() => filtroClienteEmDia()}>
        <p className='txt'>{statusCliente && statusCliente[1].status}</p>
        <p className='qtd'>{statusCliente && statusCliente[1].count}</p>
      </div>
      <div className='clientes-inadimplentes' onClick={() => filtroClienteInadimplente()}>
        <p className='txt'>{statusCliente && statusCliente[0].status}</p>
        <p className='qtd'>{statusCliente && statusCliente[0].count}</p>
      </div>
    </div>
  );
}

export default CardStatusCliente;