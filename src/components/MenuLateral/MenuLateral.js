import './styles.css';
import logoClaro from '../../assets/logo-claro.png';
import home from '../../assets/home.png';
import clientes from '../../assets/users.png';
import dinheiro from '../../assets/carbon_money.png';
import { Link } from 'react-router-dom';

function MenuLateral() {
  return (
    <div className='container-menu'>
      <img className='logo-cubos' src={logoClaro} alt='logo-cubos' />
      <Link className='btn-menu' to='/home'>
        <img className='icone' src={home} alt='icone-home' />
        HOME
      </Link>
      <Link className='btn-menu' to='/listar-cobrancas'>
        <img className='icone' src={dinheiro} alt='icone-dinheiro' />
        COBRANÇAS
      </Link>
      <Link className='btn-menu' to='/listar-clientes'>
        <img className='icone' src={clientes} alt='icone-clientes' />
        CLIENTES
      </Link>
      <Link className='btn-criar-cobranca' to='/adicionar-cobrancas'>Criar cobrança</Link>
    </div>
  )
}

export default MenuLateral;