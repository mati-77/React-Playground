import React, { Fragment } from 'react';
import LinkedinLogo from '../../imagenes/linkedin.svg';
import GitHubLogo from '../../imagenes/github.svg';

import Proyecto from './Proyecto';
import Enlace from './Enlace';

import './home.css';
import Tarjeta from './Tarjeta';

export default function Home() {

    const simonDice = "Un juego de memoria de diez niveles."

    const buscador = "Proyecto en el cual podes filtrar personajes de una serie por nombre y categorías."

    const imagenSimonDice = "proyecto--imagen-simondice"
    const imagenBuscador = "proyecto--imagen-buscador"

    return (
        <Fragment>
            <main className="home d-flex flex-column justify-content-evenly">
                <Tarjeta />
                <h5 className="text-center mb-5 ps-3 pe-3" style={{fontSize: "2rem"}}>Bienvenido/a a esta colección de proyectos desarrollados con React.js.</h5>
                <section className="proyectos">
                    <Proyecto titulo="Simón Dice" descripcion={simonDice} url="SimonDice/SimonDice.jsx" ruta="/simon" imagen={imagenSimonDice}/>
                    <Proyecto titulo="Buscador" descripcion={buscador} url="Buscador/Buscador.jsx" ruta="/buscador" imagen={imagenBuscador}/>
                </section>
                <section className="d-flex justify-content-around mb-4">
                    <Enlace imagen={LinkedinLogo} url="https://www.linkedin.com/in/matias-d-3094b8208" alt="Logo de Linkedin" texto="Linkedin"/>
                    <Enlace imagen={GitHubLogo} url="https://github.com/mati-77" alt="Logo de GitHub" texto="GitHub"/>
                </section>
            </main>
        </Fragment>
    )
}
