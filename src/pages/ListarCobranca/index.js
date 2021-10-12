import { useContext, useEffect, useState } from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaCobranca from '../../components/CardListaCobranca/CardListaCobranca';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import './styles.css';

function ListarCobranca() {
  const {tokenStorage} = useContext(ContextoDeAutorizacao);
  const [dadosCobranca, setDadosCobranca] = useState();
  const [mostrarCards, setMostrarCards] = useState(false);

  useEffect(() => {
    async function obterDadosCobranca() {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cobrancas', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      console.log('dados aqui', dados)
      if(resposta.ok) {
        setDadosCobranca(dados);
        setMostrarCards(true)
      }
      if(!resposta.ok) {
        setMostrarCards(false)
      }
    }

    obterDadosCobranca();
  }, [tokenStorage]);

  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-lista-de-cobranca'>
          <div className='cabecalho-lista-cobranca'>
            <p className='p5'>Id</p>
            <p className='p6'>Cliente</p>
            <p className='p7'>Descrição</p>
            <p className='p8'>Valor</p>
            <p className='p8'>Status</p>
            <p className='p8'>Vencimento</p>
          </div>
          <div className='lista-de-cards-cobranca'>
            {mostrarCards && dadosCobranca.map((cobranca) => <CardListaCobranca cobranca={cobranca}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarCobranca;