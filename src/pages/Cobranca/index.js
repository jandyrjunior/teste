import './styles.css';
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import FormularioCobranca from '../../components/FormularioCobranca/FormularioCobranca';

function Cobrancas() {
  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-titulo-e-form'>
          <div className='container-form-cliente'>
            <h4 className='titulo-form'>
              {'//'} ADICIONAR COBRANCA
            </h4>
            <FormularioCobranca />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Cobrancas;