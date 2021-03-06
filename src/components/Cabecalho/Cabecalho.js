import './styles.css';
import fotoUsuario from '../../assets/foto-usuario.jpg';
import editar from '../../assets/icone-editar.png';
import logout from '../../assets/icone-logout.png';
import { useState } from 'react';
import { Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import FormularioPerfil from '../FormularioPerfil/FormularioPerfil';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  }
}));

function Cabecalho() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const { tokenStorage, removeTokenStorage } = useContext(ContextoDeAutorizacao);
  const classes = useStyles();
  const history = useHistory();

  async function carregarDados() {
    setMostrarPerfil(true);
    
    const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/usuario', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    const dados = await resposta.json();

    setDadosUsuario({
      nome_usuario: dados.nome_usuario,
      email_usuario: dados.email_usuario,
      telefone_usuario: dados.telefone_usuario,
      cpf_usuario: dados.cpf_usuario
    });
  }

  function deslogar() {
    removeTokenStorage();
    history.push('/');
  }

  return (
    <div className='container-cabecalho'> 
      <img className='icone-perfil' src={fotoUsuario} alt='icone-perfil' onClick={() => setMostrarPopUp(!mostrarPopUp)} />
      <div className={mostrarPopUp ? 'menu-popup-on' : 'menu-popup-off'} >
        <div className='opcao-menu' onClick={carregarDados}> 
          <img src={editar} alt='icone-edicao' />
          Editar
        </div>
        <div className='opcao-menu' onClick={deslogar}>
          <img src={logout} alt='icone-logout' />
          Deslogar
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={mostrarPerfil} >
        <FormularioPerfil mostrarPerfil={mostrarPerfil} setMostrarPerfil={setMostrarPerfil} dadosUsuario={dadosUsuario}/>
      </Backdrop>
    </div>
  );
}

export default Cabecalho;