import './styles.css';

function ResumoCobranca() {
  const cliente = {}
  return (
    <div className='container-resumo-cobranca'>
      <div className='container-dados-cobranca-1'>
        <p className='id-cobranca'>{cliente.idCobranca || '#19'}</p>
        <p className='descricao-da-cobranca'>{cliente.descricaoCobranca || 'Pagamento referente a dívida educacional contraída para pagamento de curso de programação'}</p>
        <p className='valor-da-cobranca'>{cliente.valorCobranca || 'R$5.000,00'}</p>
      </div>
      <div className='container-dados-cobranca-2'>
        <p className='vencimento-cobranca'>{cliente.vencimento || '12/12/2021'}</p>
        <p className='status-cobranca'>{cliente.status || 'PAGO'}</p>
      </div>
    </div>
  );
}

export default ResumoCobranca;