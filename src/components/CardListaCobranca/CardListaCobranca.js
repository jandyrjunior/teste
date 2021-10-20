import { Backdrop, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import EditarCobranca from '../EditarCobranca/EditarCobranca';
import iconeEditar from '../../assets/icone-editar.png'
import './styles.css';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  } 
}));

function CardListaCobranca({cobranca, setAtualizarDadosDeCobranca, atualizarDadosDeCobranca}) { 
  /*console.log(cobranca)*/
  const [mostrarEdicaoCobranca, setMostrarEdicaoCobranca] = useState();
  const classes = useStyles();

  let data = new Date(cobranca.data_vencimento);
  let dataFormatada = (((data.getDate() + 1) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()));
  

  function abrirEdicaoDeCobranca() {
    setMostrarEdicaoCobranca(true);
  }

  function fecharEdicaoDeCobranca() {
    setMostrarEdicaoCobranca(false); 
  }

  
  return (
    <div className='card-lista-cobranca' >
      <p className='p11' >#{cobranca.id_cobranca}</p>
      <p className='p12'>{cobranca.nome_cliente}</p>
      <p title={cobranca.descricao} className='p13'>{cobranca.descricao}</p>
      <p className='p14'>{(Number((cobranca.valor >= 100 ? cobranca.valor / 100 : cobranca.valor))).toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</p>
      {/*console.log(cobranca.valor)*/}
      <p className={`p15 ${cobranca.status === 'PAGO' ? 'pago' : (cobranca.status_cobranca === 'PENDENTE' ? 'pendente' : 'vencida')}`}>{cobranca.status_cobranca.toUpperCase()}</p>
      <p className='p16'>{dataFormatada}</p>     
      <img className='icone-editar-cobranca' src={iconeEditar} alt='icone-editar-cobranca' onClick={abrirEdicaoDeCobranca}/> 
      <Backdrop className={classes.backdrop} open={mostrarEdicaoCobranca} >
        <EditarCobranca fecharEdicaoDeCobranca={fecharEdicaoDeCobranca} cobranca={cobranca} setAtualizarDadosDeCobranca={setAtualizarDadosDeCobranca} atualizarDadosDeCobranca={atualizarDadosDeCobranca}/>
        {/*console.log(mostrarEdicaoCobranca)*/}
      </Backdrop>
    </div>
  );
}

export default CardListaCobranca;