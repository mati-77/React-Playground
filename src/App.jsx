import React from 'react';
/* import './App.css'; */
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ScrollToTop from './Componentes/ScrollToTop';
import NavBar from './Componentes/NavBar';
import './css/App.css'
import Home from './Vistas/Home';
import SimonDice from './Vistas/SimonDice';
import Buscador from './Vistas/Buscador';



function App() {

  return (
    <Router>
      <ScrollToTop />
      <div style={{height:'100%'}}>
        <NavBar />
        <Switch>
          <Route path="/buscador">
              <Buscador />
          </Route>
          <Route path="/simon">
              <SimonDice />
          </Route>
          {/* <Route path="/post">
            <Post />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}


/* function Post() {
  return <h2>Post de instagram</h2>;
} */

export default App;
