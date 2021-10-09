import './styles.css';
import cliente from '../../assets/users.png';

function CardStatusCliente() {
  return (
    <div className='card-cliente'>
      <div className='topo-card-cliente'>
        <img src={cliente} alt='icone-cliente' />
        Clientes
      </div>
      <div className='clientes-em-dia'>
        <p className='txt'>Em dia</p>
        <p className='qtd'>0</p>
      </div>
      <div className='clientes-inadimplentes'>
        <p className='txt'>Inadimplentes</p>
        <p className='qtd'>0</p>
      </div>
    </div>
  );
}

export default CardStatusCliente;