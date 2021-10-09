import './styles.css';

function ResumoCobranca({ cobranca }) {
  
  return (
    <div className='container-resumo-cobranca'>
      <div className='container-dados-cobranca-1'>
        <p className='id-cobranca'>{cobranca.id_cobranca}</p>
        <p className='descricao-da-cobranca'>{cobranca.descricao}</p>
        <p className='valor-da-cobranca'>{cobranca.valor}</p>
      </div>
      <div className='container-dados-cobranca-2'>
        <p className='vencimento-cobranca'>{cobranca.data_vencimento}</p>
        <p className='status-cobranca'>{cobranca.status}</p>
      </div>
    </div>
  )
}


export default ResumoCobranca;