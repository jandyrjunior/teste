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

function CardListaDeClientes({ cliente, atualizarCards, setAtualizarCards }) {
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const [mostrarPerfilCliente, setMostrarPerfilCliente] = useState(false);
  const [mostrarDetalheCliente, setMostrarDetalheCliente] = useState(false);
  const classes = useStyles();
  /*console.log('dentro do card lista', cliente)*/
  /* async function carregarDadosCobranca() {
    

    const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cobrancas', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${tokenStorage}`
      }
    });

    const dados = await resposta.json();

    setDadosCobranca(dados);
  } */

  return (
    <div className='card-lista' key='id_cliente'>
      {
        /*console.log('dentro do card lista de clientes: ', cliente)*/}
      <div className='card-lista-dados'>
        <p className='card-lista-nome' onClick={setMostrarDetalheCliente}>{cliente.nome_cliente}</p>
        <div className='card-lista-email' >
          <img className='card-lista-img' src={iconeEmail} alt='icone-email' />
          <abbr title={cliente.email_cliente}>{cliente.email_cliente}</abbr>
        </div>
        <div className='card-lista-telefone' >
          <img className='card-lista-img' src={iconeTelefone} alt='icone-telefone' />
          <p>{cliente.telefone_cliente}</p>
        </div>
      </div>
      <div className='container-cobranca-feita'>{(cliente.cobrancas_feitas / 100).toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</div>
      <div className='container-cobranca-recebida'>{(cliente.cobrancas_recebidas / 100).toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</div>
      <div className={`container-status ${cliente.status_cliente === 'EM DIA' ? 'em-dia' : 'inadimplente'}`}>{cliente.status_cliente}</div>
      <img className='container-btn-editar' src={editar} alt='icone-editar' onClick={setMostrarPerfilCliente} />
      <Backdrop className={classes.backdrop} open={mostrarPerfilCliente} >
        <EditarCliente 
        mostrarPerfilCliente={mostrarPerfilCliente} 
        setMostrarPerfilCliente={setMostrarPerfilCliente} 
        cliente={cliente} 
        atualizarCards={atualizarCards}
        setAtualizarCards={setAtualizarCards} 
        tokenStorage={tokenStorage} />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={mostrarDetalheCliente} >
        <DetalheCliente mostrarDetalheCliente={mostrarDetalheCliente} setMostrarDetalheCliente={setMostrarDetalheCliente} cliente={cliente} />
      </Backdrop>
    </div>
  )
}

export default CardListaDeClientes;