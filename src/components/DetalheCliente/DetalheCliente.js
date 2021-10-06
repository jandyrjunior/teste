import './styles.css';
import iconeEmail from '../../assets/icone-email.png';
import iconeTelefone from '../../assets/icone-telefone.png';
import ResumoCobranca from '../ResumoCobranca/ResumoCobranca';

function DetalheCliente({ dadosCliente, mostrarDetalheCliente, setMostrarDetalheCliente }) {
  return (
    <div className='card-detalhe-cliente'>
      <p className='btn-fechar-2' onClick={() => setMostrarDetalheCliente(false)}>X</p>
      <h3>{dadosCliente.nome}</h3>
      <p className='p-cpf'>{dadosCliente.cpf}</p>
      <div className='container-detalhes-e-cobrancas'>
        <div className='container-detalhes'>
          <div className='detalhe-email-telefone'>
            <img className='icone-email' src={iconeEmail} alt='icone-email' />
            <p>{dadosCliente.email}</p>
            <img className='icone-telefone' src={iconeTelefone} alt='icone-telefone' />
            <p>{dadosCliente.telefone}</p>
          </div>
          <div className='container-endereco'>
            <div className='endereco-1'>
              <h5>Logradouro</h5>
              <p>{dadosCliente.logradouro || 'Rua Ceará'}</p>
            </div>
            <div className='endereco-1'>
              <h5>Complemento</h5>
              <p>{dadosCliente.complemento || '265, Ap 502'}</p>
            </div>
            <div className='endereco-1'>
              <h5>Bairro</h5>
              <p>{dadosCliente.bairro || 'Pituba'}</p>
            </div>
          </div>
          <div className='container-endereco'>
            <div className='endereco-1'>
              <h5>Cidade</h5>
              <p>{dadosCliente.cidade || 'Salvador'}</p>
            </div>
          </div>
          <div className='container-endereco'>
            <div className='endereco-1'>
              <h5>CEP</h5>
              <p>{dadosCliente.cep || '41830-450'}</p>
            </div>
            <div className='endereco-1'>
              <h5>Ponto de referência</h5>
              <p>{dadosCliente.referencia || 'Hiperideal'}</p>
            </div>
          </div>
        </div>
        <div className='divisor'></div>
        <div className='container-cobrancas'>
          <ResumoCobranca />
          <ResumoCobranca />
          <ResumoCobranca />
          <ResumoCobranca />
          <ResumoCobranca />
        </div>
      </div>
    </div>
  );
}

export default DetalheCliente;