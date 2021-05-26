import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './Componentes/Navegacion';

import Home from './Vistas/Home';
import SimonDice from './Vistas/SimonDice';



function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/simon">
              <SimonDice />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Post() {
  return <h2>Post de instagram</h2>;
}

export default App;
