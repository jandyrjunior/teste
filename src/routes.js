import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import LogIn from './pages/LogIn';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home'
import Construcao from './pages/Construcao';
import Clientes from './pages/Clientes';
import ContextoDeAutorizacao from './contextos/ContextoDeAutorizacao';
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import ListarClientes from './pages/ListarClientes';
import ListarCobranca from './pages/ListarCobranca';
import Cobrancas from './pages/Cobranca';

function Routes() {
  const [tokenStorage, setTokenStorage, removeTokenStorage] = useLocalStorage('tokenStorage', '');
  const [token, setToken] = useState();

  return (
    <ContextoDeAutorizacao.Provider value={{ token, setToken, tokenStorage, setTokenStorage, removeTokenStorage }}>
      <Router>
        <Switch>
          <Route path='/' exact component={LogIn} />
          <Route path='/cadastro' component={Cadastro} />
          <Route path='/home' component={Home} />
          <Route path='/construcao' component={Construcao} />
          <Route path='/adicionar-clientes' component={Clientes} />
          <Route path='/adicionar-cobrancas' component={Cobrancas} />
          <Route path='/listar-clientes' component={ListarClientes} />
          <Route path='/listar-cobrancas' component={ListarCobranca} />
          {
            token && (
              <>

              </>
            )
          }
        </Switch>
      </Router>
    </ContextoDeAutorizacao.Provider>
  );
}

export default Routes;