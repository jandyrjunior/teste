import './styles.css';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'; import { useContext, useEffect, useState } from 'react';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import iconeFiltro from '../../assets/icone-filtro.png';
import iconeLupa from '../../assets/icone-lupa.png';
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaCobranca from '../../components/CardListaCobranca/CardListaCobranca';
import CardListaDeClientes from '../../components/CardListaDeClientes/CardListaDeClientes';

function Relatorio() {
  const { tokenStorage, filtroC, setFiltroC, filtroS, setFiltroS } = useContext(ContextoDeAutorizacao);
  const [dadosCliente, setDadosCliente] = useState();
  const [atualizarCards, setAtualizarCards] = useState(false);
  const [ordenar, setOrdenar] = useState(false);
  const [clientePesquisado, setClientePesquisado] = useState('');
  const [erro, setErro] = useState('');
  const [dadosCobranca, setDadosCobranca] = useState();
  const [atualizarDadosDeCobranca, setAtualizarDadosDeCobranca] = useState(false);
  const [popC, setPopC] = useState(false);
  const [popS, setPopS] = useState(false);

  function verificaInputPesquisa(conteudo) {
    if (!conteudo) {
      setAtualizarCards(!atualizarCards);
      setClientePesquisado('')
      return;
    }
    setClientePesquisado(conteudo);
  }

  function filtrarClientes(dado) {
    const listaClientes = dadosCliente
    if (dado.includes('@')) {
      for (const cliente of listaClientes) {
        const emailTratado = cliente.email_cliente.toUpperCase();
        const dadoTratado = dado.toUpperCase();
        if (emailTratado.includes(dadoTratado)) {
          setDadosCliente([cliente]);
          return;
        }
      }
    }
    if (dado.includes('-') || Number(dado)) {
      if (!dado.includes('-')) {
        const cpfTratado = dado.substr(0, 3) + '.' + dado.substr(3, 3) + '.' + dado.substr(6, 3) + '-' + dado.substr(9, 2)
        for (const cliente of listaClientes) {
          if (cliente.cpf_cliente.includes(cpfTratado)) {
            setDadosCliente([cliente]);
            return;
          }
        }
      }
      for (const cliente of listaClientes) {
        if (cliente.cpf_cliente.includes(dado)) {
          setDadosCliente([cliente]);
          return;
        }
      }
    }
    if (!Number(dado)) {
      let clientesEncontrados = []
      for (const cliente of listaClientes) {
        const nomeTratado = cliente.nome_cliente.toUpperCase();
        const dadoTratado = dado.toUpperCase();
        if (nomeTratado.includes(dadoTratado)) {
          clientesEncontrados.push(cliente)
          setDadosCliente(clientesEncontrados);
        }
      }
      if (clientesEncontrados.length === 0) {
        setErro('Cliente não encontrado.')
        setDadosCliente([])
      }
      return;
    }
    setErro('Cliente não encontrado.')
    setDadosCliente([])
  }

  useEffect(() => {
    console.log(filtroC)
    if (filtroC === 'clientes') {
      async function buscarClientes() {

        const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/clientes', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenStorage}`
          }
        });
        let dados = await resposta.json();
        let dadosFiltrados = []
        
        if (resposta.ok) {
          if(filtroS.toUpperCase() === 'EM DIA') {
            for (const dado of dados) {
              if(dado.status_cliente === 'EM DIA') {
                dadosFiltrados.push(dado)
              }
            }
          }
          if(filtroS.toUpperCase() === 'INADIMPLENTE') {
            for (const dado of dados) {
              if(dado.status_cliente === 'INADIMPLENTE') {
                dadosFiltrados.push(dado)
              }
            }
          }

          dadosFiltrados = dadosFiltrados.sort((a, b) => {
            if (a.nome_cliente > b.nome_cliente) {
              return 1
            }
            if (a.nome_cliente < b.nome_cliente) {
              return -1
            }
            return 0
          })
          setDadosCliente(dadosFiltrados );
        }

      }
      buscarClientes();
    }

    if (filtroC === 'cobrancas') {
      async function obterDadosCobranca() {
        const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/cobrancas', {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${tokenStorage}`
          }
        });

        const dados = await resposta.json();        
        let dadosFiltrados = []
        console.log(dados)
        if (resposta.ok) {
          
          if(filtroS.toUpperCase() === 'EM DIA') {
            for (const dado of dados) {
              if(dado.status_cobranca === 'PAGO' || dado.status_cobranca === 'PENDENTE') {
                dadosFiltrados.push(dado)
              }
            }
          }
          if(filtroS.toUpperCase() === 'INADIMPLENTE') {
            for (const dado of dados) {
              if(dado.status_cobranca === 'VENCIDO') {
                dadosFiltrados.push(dado)
              }
            }
          }
          
          const listaOrdenada = dadosFiltrados.sort((a, b) => {
            if (a.id_cobranca > b.id_cobranca) {
              return 1
            }
            if (a.id_cobranca < b.id_cobranca) {
              return -1
            }
            return 0
          })
          setDadosCobranca(listaOrdenada);
        }
      }

      obterDadosCobranca();
    }
  }, [tokenStorage, filtroC, filtroS])

  const fecharErro = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErro(false);
  };

  return (
    <div className='container'>
      <div className='container-menu-lateral'>
        <MenuLateral />
      </div>
      <div className='container-main'>
        <div className='cabecalho'>
          <Cabecalho />
        </div>
        <div className='container-relatorio'>
          <div className='container-btn-filtro'>
            <div className='container-set-filtro'>
              <h4 className='filtro-cliente' onClick={() => setPopC(!popC)}>{filtroC.toUpperCase()}</h4>
              <div className={popC ? 'pop-C-on' : 'pop-C-off'}>
                <p onClick={() => setPopC(false)} onMouseDown={() => setFiltroC('clientes')}>Clientes</p>
                <p onClick={() => setPopC(false)} onMouseDown={() => setFiltroC('cobrancas')}>Cobranças</p>
              </div>
              <div className='separador'></div>
              <h4 className='filtro-status' onClick={() => setPopS(!popS)}>{filtroS.toUpperCase()}</h4>
              <div className={popS ? 'pop-S-on' : 'pop-S-off'}>
                <p onClick={() => setPopS(false)} onMouseDown={() => setFiltroS('em dia')}>Em Dia</p>
                <p onClick={() => setPopS(false)} onMouseDown={() => setFiltroS('inadimplente')}>Inadimplente</p>
              </div>
            </div>
            <div className='container-filtro'>
              <input
                type='text'
                placeholder='Pesquisar por Nome, E-mail ou CPF...'
                value={clientePesquisado}
                onChange={(e) => verificaInputPesquisa(e.target.value)}
                onFocus={() => setAtualizarCards(!atualizarCards)}
                onKeyDown={(e) => e.key === 'Enter' ? filtrarClientes(clientePesquisado) : ''}
              />
              <div className='botao-pesquisar' onClick={() => filtrarClientes(clientePesquisado)}>
                <img src={iconeLupa} alt='icone-lupa' />
                <p>BUSCAR</p>
              </div>
            </div>
          </div>
          <div className='conteudo-filtro'>
            {filtroC === 'clientes' &&
              <div className='container-lista-de-clientes'>
                <div className='cabecalho-lista-clientes'>
                  <p className='p1'>Clientes<img src={iconeFiltro} alt='icone-filtro' onClick={() => setOrdenar(!ordenar)} /></p>
                  <p className='p2'>Cobranças Feitas</p>
                  <p className='p3'>Cobranças Recebidas</p>
                  <p className='p4'>Status</p>
                </div>

                <div className='lista-de-cards rel'>
                  {dadosCliente && (dadosCliente.map((cliente) => {
                    return (
                      < CardListaDeClientes cliente={cliente} atualizarCards={atualizarCards} setAtualizarCards={setAtualizarCards} />
                    )
                  }))}
                </div>
              </div>
            }
            {filtroC === 'cobrancas' &&
              <div className='container-lista-de-cobranca'>
                <div className='cabecalho-lista-cobranca'>
                  <p className='p5'>Id</p>
                  <p className='p6'>Cliente</p>
                  <p className='p7'>Descrição</p>
                  <p className='p8'>Valor</p>
                  <p className='p8'>Status</p>
                  <p className='p8'>Vencimento</p>
                </div>
                <div className='lista-de-cards-cobranca rel'>
                  {dadosCobranca && dadosCobranca.map((cobranca) => <CardListaCobranca cobranca={cobranca} setAtualizarDadosDeCobranca={setAtualizarDadosDeCobranca} atualizarDadosDeCobranca={atualizarDadosDeCobranca} />)}
                </div>
              </div>
            }
          </div>
          <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
            <Alert severity="error">{erro}</Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default Relatorio;