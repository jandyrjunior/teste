import './styles.css';
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import FormularioCliente from '../../components/FormularioCliente/FormularioCLiente';

function Clientes() {
  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-form-cliente'>
          <h4 className='titulo-form'>
            // ADICIONAR CLIENTES
          </h4>
          <FormularioCliente />
        </div>
      </div>
    </div>

  )
}

export default Clientes;