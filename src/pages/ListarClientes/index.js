import { Link } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaDeClientes from '../../components/ListaDeClientes/ListaDeClientes';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './styles.css'

function ListarClientes() {
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
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
              <CardListaDeClientes />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListarClientes;