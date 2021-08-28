import React, { Fragment } from 'react';
import LinkedinLogo from '../../imagenes/linkedin.svg';
import GitHubLogo from '../../imagenes/github.svg';

import Proyecto from './Proyecto';
import Enlace from './Enlace';

import './home.css';

export default function Home() {

    const simonDice = "Es un juego de memoria de diez niveles. Cada vez que se hace click en el botón de inicio, se genera un array con una secuencia de números, que se corresponden con los cuatro colores del juego. De acuerdo al nivel, se iluminará una cantidad de luces, que el usuario deberá presionar. Las luces solo podrán ser presionadas una vez que terminen de iluminarse, y el juego podrá ser finalizado en cualquier momento presionando el botón de Finalizar. El array con la secuencia de números aparece en la consola del navegador.";

    const buscador = "Se obtienen los personajes de una API de Rick and Morty. En caso de no haber un error, se imprimirán tarjetas con datos e imágenes de los personajes, y el usuario podrá filtrarlos según sus nombres de acuerdo a lo que escriba en un buscador. Además, se podrán aplicar filtros, que incluso pueden actuar combinados, y usar también el buscador para filtrar los resultados según su nombre.";
    
    return (
        <Fragment>
            <main className="home d-flex flex-column justify-content-evenly">
                <h2 className="text-center mt-5 mb-5 ps-3 pe-3">Hola! Mi nombre es Matias, y soy un desarrollador frontend</h2>
                <h5 className="text-center mb-5 ps-3 pe-3">Bienvenido/a a esta colección de proyectos desarrollados con React.js.</h5>
                <div className="proyectos">
                    <Proyecto titulo="Simón Dice" descripcion={simonDice} url="SimonDice.jsx" ruta="/simon"/>
                    <Proyecto titulo="Buscador" descripcion={buscador} url="Buscador.jsx" ruta="/buscador"/>
                </div>
                <section className="d-flex justify-content-around mb-4">
                    <Enlace imagen={LinkedinLogo} url="https://www.linkedin.com/in/matias-d-3094b8208" alt="Logo de Linkedin" texto="Linkedin"/>
                    <Enlace imagen={GitHubLogo} url="https://github.com/mati-77" alt="Logo de GitHub" texto="GitHub"/>
                </section>
            </main>
        </Fragment>
    )
}
