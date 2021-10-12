import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaDeClientes from '../../components/CardListaDeClientes/CardListaDeClientes';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import './styles.css'

function ListarClientes() {
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const [dadosCliente, setDadosCliente] = useState();
  const [showCard, setShowCard] = useState(false)
  const [atualizarCards, setAtualizarCards] = useState(false);

  useEffect(() => {
    async function buscarClientes() {

      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/clientes', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      console.log('dados', dados);
      console.log(resposta.ok)

      if (resposta.ok) {
        setDadosCliente(dados);
        setShowCard(true);
      }

    }
    buscarClientes();
  }, [tokenStorage, atualizarCards]);

  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-btn-lista'>
          <div className='container-btn-add-clientes'>
            <Link to='/adicionar-clientes' className='btn-add-clientes'>Adicionar cliente</Link>
          </div>
          <div className='container-lista-de-clientes'>
            <div className='cabecalho-lista-clientes'>
              <p className='p1'>Clientes</p>
              <p className='p2'>Cobranças Feitas</p>
              <p className='p3'>Cobranças Recebidas</p>
              <p className='p4'>Status</p>
            </div>

            <div className='lista-de-cards'>
              {(showCard && dadosCliente.map((cliente) => {
                return (
                  < CardListaDeClientes cliente={cliente} atualizarCards={atualizarCards} setAtualizarCards={setAtualizarCards} />
                )
              }))}

            </div>
            {/* <div className='lista-de-cards'>
              {showCard && <CardListaDeClientes dadosCliente={dadosCliente}/>}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListarClientes;