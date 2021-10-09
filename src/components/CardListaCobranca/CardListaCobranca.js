import './styles.css';

function CardListaCobranca({cobranca}) { 
  
  return (
    <div className='card-lista-cobranca'>
      <p className='p11'>{cobranca.id_cobranca}</p>
      <p className='p12'>{cobranca.nome_cliente}</p>
      <p className='p13'>{cobranca.descricao}</p>
      <p className='p14'>{cobranca.valor}</p>
      <p className='p15'>{cobranca.status}</p>
      <p className='p16'>{cobranca.data_vencimento}</p>
    </div>
  );
}

export default CardListaCobranca;