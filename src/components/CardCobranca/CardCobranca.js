import './styles.css';
import dinheiro from '../../assets/carbon_money.png';

function CardCobranca() {
  return (
    <div className='card-cobranca'>
      <div className='topo-card-cobranca'>
        <img src={dinheiro} alt='icone-dinheiro' />
        Cobrança
      </div>
      <div className='previstas'>
        <p className='txt'>Previstas</p>
        <p className='qtd'>0</p>
      </div>
      <div className='vencidas'>
        <p className='txt'>Vencidas</p>
        <p className='qtd'>0</p>
      </div>
      <div className='pagas'>
        <p className='txt'>Pagas</p>
        <p className='qtd'>0</p>
      </div>
    </div>
  );
}

export default CardCobranca;