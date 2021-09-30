import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './styles.css';
import CardCliente from "../../components/CardCliente/CardCliente";
import CardCobranca from "../../components/CardCobranca/CardCobranca";

function Home() {
  return (
    <div className='container'>
      <div className='container-menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-dashboard'>
          <CardCliente />
          <CardCobranca />
        </div>
      </div>
    </div>
  );
}

export default Home;