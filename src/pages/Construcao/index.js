import MenuLateral from "../../components/MenuLateral/MenuLateral";
import './styles.css';

function Construcao() {
  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <h1>Estamos trabalhando</h1>
      </div>
    </div>

  )
}

export default Construcao;