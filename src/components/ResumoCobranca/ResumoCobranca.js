import './styles.css';

function ResumoCobranca({ cobranca }) {
  let data = new Date(cobranca.data_vencimento);
  let dataFormatada = (((data.getDate() + 1) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()));
  return (
    <div className='container-resumo-cobranca'>
      <div className='container-dados-cobranca-1'>
        <p className='id-cobranca'>{`#${cobranca.id_cobranca}`}</p>
        <abbr title={cobranca.descricao} className='descricao-da-cobranca'>{cobranca.descricao}</abbr>
        <p className='valor-da-cobranca'>{(cobranca.valor/100).toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</p>
      </div>
      <div className='container-dados-cobranca-2'>
        <p className='vencimento-cobranca'>{dataFormatada}</p>
        <p className={`status-cobranca ${cobranca.status_cobranca === 'PAGO' ? 'pago' : (cobranca.status_cobranca === 'PENDENTE' ? 'pendente' : 'vencida')}`}>{cobranca.status_cobranca}</p>
      </div>
    </div>
  )
}


export default ResumoCobranca;