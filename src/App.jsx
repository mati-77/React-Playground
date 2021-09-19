import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ScrollToTop from './ScrollToTop';
import NavBar from './NavBar';
import Home from './Vistas/Home/Home';
import SimonDice from './Vistas/SimonDice/SimonDice';
import Buscador from './Vistas/Buscador/Buscador';
import Form from './Vistas/Form/Form'



function App() {

  return (
    <Router>
      <ScrollToTop />
      <div>
        <NavBar />
        <Switch>
          <Route path="/form">
              <Form />
          </Route>
          <Route path="/buscador">
              <Buscador />
          </Route>
          <Route path="/simon">
              <SimonDice />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
