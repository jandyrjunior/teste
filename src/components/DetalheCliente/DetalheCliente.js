import './styles.css';
import iconeEmail from '../../assets/icone-email.png';
import iconeTelefone from '../../assets/icone-telefone.png';
import ResumoCobranca from '../ResumoCobranca/ResumoCobranca';

function DetalheCliente({ cliente, setMostrarDetalheCliente }) {
  const cobrancas = [...cliente.cobrancas];
  /*console.log('dentro de detalhe cliente', cliente)*/
  return (
    <div className='card-detalhe-cliente'>
      <p className='btn-fechar-2' onClick={() => setMostrarDetalheCliente(false)}>X</p>
      <h3>{cliente.nome_cliente}</h3>
      <p className='p-cpf'>{cliente.cpf_cliente}</p>
      <div className='container-detalhes-e-cobrancas'>
        <div className='container-detalhes'>
          <div className='detalhe-email-telefone'>
            <img className='icone-email' src={iconeEmail} alt='icone-email' />
            <p>{cliente.email_cliente}</p>
            <img className='icone-telefone' src={iconeTelefone} alt='icone-telefone' />
            <p>{cliente.telefone_cliente}</p>
          </div>
          <div className='container-endereco'>
            <div className='endereco-1'>
              <h5>Logradouro</h5>
              <p>{cliente.logradouro}</p>
            </div>
            <div className='endereco-1'>
              <h5>Complemento</h5>
              <p>{cliente.complemento}</p>
            </div>
            <div className='endereco-1'>
              <h5>Bairro</h5>
              <p>{cliente.bairro}</p>
            </div>
          </div>
          <div className='container-endereco'>
            <div className='endereco-1'>
              <h5>Cidade</h5>
              <p>{cliente.cidade}</p>
            </div>
          </div>
          <div className='container-endereco'>
            <div className='endereco-1'>
              <h5>CEP</h5>
              <p>{cliente.cep}</p>
            </div>
            <div className='endereco-1'>
              <h5>Ponto de referência</h5>
              <p>{cliente.referencia}</p>
            </div>
          </div>
        </div>
        <div className='divisor'></div>
        <div className='container-cobrancas'>
          {cliente && cobrancas.map((cobranca) => {
            return (
              <ResumoCobranca cobranca={cobranca}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default DetalheCliente;