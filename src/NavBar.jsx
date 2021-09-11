import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css'

export default function NavBar() {

    return (
        <nav className="navbarmanual">
            <div className="navbarmanual-contenedor">
                <div className="navbar-nombre">
                <Link to="/">React Playground</Link> 
                </div>
                <div className="navbar-links">
                    <Link to="/" >Inicio</Link>
                    <Link to="/" >Acerca</Link>
                    <Link to="/" >Proyectos</Link>
                </div>
            </div>
        </nav>
    )
}
