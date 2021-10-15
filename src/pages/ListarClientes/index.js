import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import CardListaDeClientes from '../../components/CardListaDeClientes/CardListaDeClientes';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import ContextoDeAutorizacao from '../../contextos/ContextoDeAutorizacao';
import iconeFiltro from '../../assets/icone-filtro.png';
import iconeLupa from '../../assets/icone-lupa.png';
import './styles.css'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function ListarClientes() {
  const { tokenStorage } = useContext(ContextoDeAutorizacao);
  const [dadosCliente, setDadosCliente] = useState();
  const [showCard, setShowCard] = useState(false)
  const [atualizarCards, setAtualizarCards] = useState(false);
  const [ordenar, setOrdenar] = useState(false);
  const [clientePesquisado, setClientePesquisado] = useState('');
  const [erro, setErro] = useState('');

  function verificaInputPesquisa(conteudo) {
    if (!conteudo) {
      setAtualizarCards(!atualizarCards);
      setClientePesquisado('')
      return;
    }
    setClientePesquisado(conteudo);
  }

  function filtrarCliente(dado) {
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
      }
      return;
    }
    setErro('Cliente não encontrado.')
  }

  useEffect(() => {
    async function buscarClientes() {

      const resposta = await fetch('https://api-cubos-cobranca.herokuapp.com/clientes', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenStorage}`
        }
      });

      let dados = await resposta.json();

      if (resposta.ok) {
        if (ordenar) {
          dados = dados.sort((a, b) => {
            if (a.nome_cliente > b.nome_cliente) {
              return 1
            }
            if (a.nome_cliente < b.nome_cliente) {
              return -1
            }
            return 0
          })
        }
        setDadosCliente(dados);
        setShowCard(true);
      }

    }
    buscarClientes();
  }, [tokenStorage, atualizarCards, ordenar]);

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
        <div className='container-btn-lista'>
          <div className='container-btn-filtro'>
            <div className='container-btn-add-clientes'>
              <Link to='/adicionar-clientes' className='btn-add-clientes'>Adicionar cliente</Link>
            </div>
            <div className='container-filtro'>
              <input
                type='text'
                placeholder='Pesquisar por Nome, E-mail ou CPF...'
                value={clientePesquisado}
                onChange={(e) => verificaInputPesquisa(e.target.value)}
                onFocus={() => setAtualizarCards(!atualizarCards)}
                onKeyDown={(e) => e.key === 'Enter' ? filtrarCliente(clientePesquisado) : ''}
              />
              <div className='botao-pesquisar' onClick={() => filtrarCliente(clientePesquisado)}>
                <img src={iconeLupa} alt='icone-lupa' />
                <p>BUSCAR</p>
              </div>
            </div>
          </div>
          <div className='container-lista-de-clientes'>
            <div className='cabecalho-lista-clientes'>
              <p className='p1'>Clientes<img src={iconeFiltro} alt='icone-filtro' onClick={() => setOrdenar(!ordenar)} /></p>
              <p className='p2'>Cobranças Feitas</p>
              <p className='p3'>Cobranças Recebidas</p>
              <p className='p4'>Status</p>
            </div>

            <div className='lista-de-cards'>
              {(showCard && dadosCliente.map((cliente) => {
                return (
                  < CardListaDeClientes cliente={cliente} atualizarCards={atualizarCards} setAtualizarCards={setAtualizarCards} />
                )
              }))}

            </div>
            <Snackbar open={erro ? true : false} autoHideDuration={5000} onClose={(e) => fecharErro(e)}>
              <Alert severity="error">{erro}</Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListarClientes;