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
import React from 'react';
import { useLocalStorage } from 'react-use';

function Routes() {
  const [ token, setToken ] = React.useState();
  const [ tokenStorage, setTokenStorage, removeTokenStorage ] = useLocalStorage('tokenStorage', '');
  return (
    <ContextoDeAutorizacao.Provider value={{ token, setToken, tokenStorage, setTokenStorage, removeTokenStorage }}>
      <Router>
        <Switch>
          <Route path='/' exact component={LogIn} />
          <Route path='/cadastro' component={Cadastro} />
          <Route path='/home' component={Home} />
          <Route path='/construcao' component={Construcao} />           
          <Route path='/clientes' component={Clientes} />       
        </Switch>
      </Router>
    </ContextoDeAutorizacao.Provider>
  );
}

export default Routes;