import './styles.css';
import dinheiro from '../../assets/carbon_money.png';
import { useContext } from 'react';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { useEffect } from 'react';
import { useState } from 'react';

function CardStatusCobranca() {  

  const [statusCobranca, setStatusCobranca] = useState();
  const {tokenStorage} = useContext(ContextoDeAutorizacao)

  useEffect(() => {
    async function obterStatusCobranca() {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cobrancas/contador', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      setStatusCobranca(dados);
    }

    obterStatusCobranca();
  }, [tokenStorage]);

  return (
    <div className='card-cobranca'>
      <div className='topo-card-cobranca'>
        <img src={dinheiro} alt='icone-dinheiro' />
        Cobrança
      </div>
      <div className='previstas'>
        <p className='txt'>{statusCobranca && statusCobranca[1].status_cobranca}</p>
        <p className='qtd'>{statusCobranca && statusCobranca[1].count}</p>
      </div>
      <div className='vencidas'>
        <p className='txt'>{statusCobranca && statusCobranca[2].status_cobranca}</p>
        <p className='qtd'>{statusCobranca && statusCobranca[2].count}</p>
      </div>
      <div className='pagas'>
        <p className='txt'>{statusCobranca && statusCobranca[0].status_cobranca}</p>
        <p className='qtd'>{statusCobranca && statusCobranca[0].count}</p>
      </div>
    </div>
  );
}

export default CardStatusCobranca;