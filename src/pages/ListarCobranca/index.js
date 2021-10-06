import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaCobranca from '../../components/CardListaCobranca/CardListaCobranca';
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
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
            <CardListaCobranca />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarCobranca;