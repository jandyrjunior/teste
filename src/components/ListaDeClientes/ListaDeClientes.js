import './styles.css';
import iconeEmail from '../../assets/icone-email.png';
import iconeTelefone from '../../assets/icone-telefone.png';
import editar from '../../assets/icone-editar.png';
import { useContext, useState } from 'react';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import { Backdrop, makeStyles } from '@material-ui/core';
import EditarCliente from '../EditarCliente/EditarCliente';
import DetalheCliente from '../DetalheCliente/DetalheCliente';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  }
}));

function CardListaDeClientes({cliente}) {
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const [mostrarPerfilCliente, setMostrarPerfilCliente] = useState(false);
  const [mostrarDetalheCliente, setMostrarDetalheCliente] = useState(false);
  const classes = useStyles();

  /*async function carregarDadosCliente() {
    setMostrarPerfilCliente(true);

    const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/usuario', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    const dados = await resposta.json();

    setDadosCliente({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      cpf: dados.cpf,
      cep: dados.cep,
      logradouro: dados.logradouuro,
    });
  }*/

  return (
    <div className='card-lista'>
      <div className='card-lista-dados'>
        <p className='card-lista-nome' onClick={setMostrarDetalheCliente}>{cliente.nome}</p>
        <div className='card-lista-email' >
          <img className='card-lista-img' src={iconeEmail} alt='icone-email' />
          <p>{cliente.email}</p>
        </div>
        <div className='card-lista-telefone' >
          <img className='card-lista-img' src={iconeTelefone} alt='icone-telefone' />
          <p>{cliente.telefone}</p>
        </div>
      </div>
      <div className='container-cobranca-feita'>{`R$ ${(cliente/100).toFixed(2)}`}</div>
      <div className='container-cobranca-recebida'>{'R$ 00.000,00'}</div>
      <div className='container-status'>{'EM DIA'}</div>
      <img className='container-btn-editar' src={editar} alt='icone-editar' onClick={setMostrarPerfilCliente} />
      <Backdrop className={classes.backdrop} open={mostrarPerfilCliente} >
        <EditarCliente mostrarPerfilCliente={mostrarPerfilCliente} setMostrarPerfilCliente={setMostrarPerfilCliente} cliente={cliente} tokenStorage={tokenStorage} />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={mostrarDetalheCliente} >
        <DetalheCliente mostrarDetalheCliente={mostrarDetalheCliente} setMostrarDetalheCliente={setMostrarDetalheCliente} cliente={cliente} />
      </Backdrop>
    </div>
  );
}

export default CardListaDeClientes;