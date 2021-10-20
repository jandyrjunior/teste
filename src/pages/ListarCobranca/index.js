import { useContext, useEffect, useState } from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaCobranca from '../../components/CardListaCobranca/CardListaCobranca';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import iconeLupa from '../../assets/icone-lupa.png';
import './styles.css';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function ListarCobranca() {
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const [dadosCobranca, setDadosCobranca] = useState();
  const [mostrarCards, setMostrarCards] = useState(false);
  const [atualizarDadosDeCobranca, setAtualizarDadosDeCobranca] = useState(false)

  const [atualizarCards, setAtualizarCards] = useState(false);
  const [cobrancaPesquisada, setCobrancaPesquisada] = useState('');
  const [erro, setErro] = useState('');

  function verificaInputPesquisa(conteudo) {
    if (!conteudo) {
      setAtualizarCards(!atualizarCards);
      setCobrancaPesquisada('')
      return;
    }
    setCobrancaPesquisada(conteudo);
  }

  function filtrarCobranca(dado) {
    const listaDeCobranca = dadosCobranca

    if (Number(dado)) {
      for (const cobranca of listaDeCobranca) {
        if (cobranca.id_cobranca === Number(dado)) {
          setDadosCobranca([cobranca]);
          return;
        }
      }
    }
    if (!Number(dado)) {
      let cobrancasEncontrados = []
      if (dado.toUpperCase() === 'PAGO' || dado.toUpperCase() === 'PENDENTE' || dado.toUpperCase() === 'VENCIDO') {
        for (const cobranca of listaDeCobranca) {
          const statusTratado = cobranca.status_cobranca.toUpperCase();
          const dadoTratado = dado.toUpperCase();
          if (statusTratado.includes(dadoTratado)) {
            cobrancasEncontrados.push(cobranca)
            setDadosCobranca(cobrancasEncontrados);
          }
        }
        if (cobrancasEncontrados.length === 0) {
          setErro('Cobranca não encontrado.')
          setDadosCobranca([])
        }
        return;
      }
      for (const cobranca of listaDeCobranca) {
        const nomeTratado = cobranca.nome_cliente.toUpperCase();
        const dadoTratado = dado.toUpperCase();
        if (nomeTratado.includes(dadoTratado)) {
          cobrancasEncontrados.push(cobranca)
          setDadosCobranca(cobrancasEncontrados);
        }
      }
      if (cobrancasEncontrados.length === 0) {
        setErro('Cobranca não encontrado.')
        setDadosCobranca([])
      }
      return;
    }
    setErro('Cobranca não encontrado.')
    setDadosCobranca([])
  }

  useEffect(() => {
    async function obterDadosCobranca() {
      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cobrancas', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      const dados = await resposta.json();
      /*console.log('dados aqui', dados)*/
      if (resposta.ok) {
        const listaOrdenada = dados.sort((a, b) => {
          if (a.id_cobranca > b.id_cobranca) {
            return 1
          }
          if (a.id_cobranca < b.id_cobranca) {
            return -1
          }
          return 0
        })
        setDadosCobranca(listaOrdenada);
        console.log(listaOrdenada)
        setMostrarCards(true)
      }
      if (!resposta.ok) {
        setMostrarCards(false)
      }
    }

    obterDadosCobranca();
  }, [tokenStorage, atualizarDadosDeCobranca, atualizarCards]);

  const fecharErro = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErro(false);
  };

  return (
    <div className='container'>
      <div className='menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-lista-de-cobranca'>
          <div className='container-filtro-cobranca'>
            <input
              type='text'
              placeholder='Pesquisar por Id, Nome ou Status...'
              value={cobrancaPesquisada}
              onChange={(e) => verificaInputPesquisa(e.target.value)}
              onFocus={() => setAtualizarCards(!atualizarCards)}
              onKeyDown={(e) => e.key === 'Enter' ? filtrarCobranca(cobrancaPesquisada) : ''}
            />
            <div className='botao-pesquisar' onClick={() => filtrarCobranca(cobrancaPesquisada)}>
              <img src={iconeLupa} alt='icone-lupa' />
              <p>BUSCAR</p>
            </div>
          </div>
          <div className='cabecalho-lista-cobranca'>
            <p className='p5'>Id</p>
            <p className='p6'>Cliente</p>
            <p className='p7'>Descrição</p>
            <p className='p8'>Valor</p>
            <p className='p9'>Status</p>
            <p className='p10'>Vencimento</p>
          </div>
          <div className='lista-de-cards-cobranca'>
            {mostrarCards && dadosCobranca.map((cobranca) => <CardListaCobranca cobranca={cobranca} setAtualizarDadosDeCobranca={setAtualizarDadosDeCobranca} atualizarDadosDeCobranca={atualizarDadosDeCobranca} />)}
          </div>
          <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
            <Alert severity="error">{erro}</Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default ListarCobranca;