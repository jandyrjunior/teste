import './styles.css';

function CardListaCobranca({cobranca}) { 
  console.log(cobranca)
  let data = new Date(cobranca.data_vencimento);
  let dataFormatada = (((data.getDate() + 1) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()));
  
  return (
    <div className='card-lista-cobranca'>
      <p className='p11'>#{cobranca.id_cobranca}</p>
      <p className='p12'>{cobranca.nome_cliente}</p>
      <abbr title={cobranca.descricao} className='p13'>{cobranca.descricao}</abbr>
      <p className='p14'>{(cobranca.valor/100).toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</p>
      <p className={`p15 ${cobranca.status === 'PAGO' ? 'pago' : (cobranca.status_cobranca === 'PENDENTE' ? 'pendente' : 'vencida')}`}>{cobranca.status_cobranca.toUpperCase()}</p>
      <p className='p16'>{dataFormatada}</p>
    </div>
  );
}

export default CardListaCobranca;