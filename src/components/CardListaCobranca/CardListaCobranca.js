import './styles.css';

function CardListaCobranca() {
  const cliente = ''
  return (
    <div className='card-lista-cobranca'>
      <p className='p11'>{cliente.id || '#19'}</p>
      <p className='p12'>{cliente.nome || 'Jandyr Junior'}</p>
      <p className='p13'>{cliente.descricao || 'Pagamento referente a compras de material escolar para o curso CUbos Academy'}</p>
      <p className='p14'>{cliente.valor || 'R$ 11.250,53'}</p>
      <p className='p15'>{cliente.status || 'PAGO'}</p>
      <p className='p16'>{cliente.vencimento || '12/08/2021'}</p>
    </div>
  );
}

export default CardListaCobranca;