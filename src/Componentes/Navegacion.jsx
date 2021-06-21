import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {

    const [menuVisible, setMenuVisible] = useState(false)

    function estaDesplegado() {
        if(!menuVisible) {
            setMenuVisible(true)
        } else {
            setMenuVisible(false)
        }
    }

    function cerrarBarra() {
        let botonCerrarBarra = document.getElementById("botonBarra")
        if (menuVisible && window.innerWidth < 993) {
            botonCerrarBarra.click()
        } else {
            return
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <p className="navbar-brand mb-0">React Playground</p>
                <button id="botonBarra" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onClick={estaDesplegado}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-link active" aria-current="page" onClick={cerrarBarra}>Home</Link>
                        <Link to="/simon" className="nav-link active" onClick={cerrarBarra}>Simon Dice</Link>
                        <Link to="/buscador" className="nav-link active" onClick={cerrarBarra}>Buscador</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
