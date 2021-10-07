import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaDeClientes from '../../components/ListaDeClientes/ListaDeClientes';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import './styles.css'

function ListarClientes() {  
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const [dadosCliente, setDadosCliente] = useState([]);

  useEffect(() => {
    async function buscarClientes() {

      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cliente', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      setDadosCliente(dados);
    }
    buscarClientes()
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
              {dadosCliente && dadosCliente.map((cliente) => <CardListaDeClientes cliente={cliente}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListarClientes;