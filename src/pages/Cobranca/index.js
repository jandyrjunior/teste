import Cabecalho from '../../components/Cabecalho/Cabecalho';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './styles.css';

function ListarCobranca() {
  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-lista-de-cobrancas'>
          <div className='cabecalho-lista-cobrancas'>
            <p className='p1'>Clientes</p>
            <p className='p2'>Cobranças Feitas</p>
            <p className='p3'>Cobranças Recebidas</p>
            <p className='p4'>Status</p>
          </div>
          <div className='lista-de-cards'>
            <h1>Cobranças aqui</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarCobranca;