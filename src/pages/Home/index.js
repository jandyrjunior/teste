import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import './styles.css';
import CardStatusCliente from "../../components/CardStatusCliente/CardStatusCliente";
import CardStatusCobranca from "../../components/CardStatusCobranca/CardStatusCobranca";

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
          <CardStatusCliente />
          <CardStatusCobranca />
        </div>
      </div>
    </div>
  );
}

export default Home;