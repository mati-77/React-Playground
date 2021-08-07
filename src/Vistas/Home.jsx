import React, { Fragment } from 'react';
import LinkedinLogo from '../imagenes/linkedin.svg';
import GitHubLogo from '../imagenes/github.svg';

import '../css/home.css'


export default function Home() {
    return (
        <Fragment>
            <main className="home d-flex flex-column justify-content-evenly">
                <h2 className="text-center mt-5 mb-5 ps-3 pe-3">Hola! Mi nombre es Matias, y soy un frontend developer Jr.</h2>
                <h5 className="text-center mb-5 ps-3 pe-3">Bienvenido/a a mi primer proyecto desarrollado con React.js. Acá vas a encontrar demostraciones de lo que puedo hacer hasta el momento. Podes acceder a cada demostración desde la barra de navegación</h5>
                <div className="proyectos">
                    <section className="proyecto">
                        <div className="ps-3 pe-3 border border-light rounded text-light h-100">
                            <p className="mt-3"><b>Simón Dice</b></p>
                            <p className="mb-4">Es un juego de memoria de diez niveles. Cada vez que se hace click en el botón de inicio, se genera un array con una secuencia de números, que se corresponden con los cuatro colores del juego. De acuerdo al nivel, se iluminará una cantidad de luces, que el usuario deberá presionar. Las luces solo podrán ser presionadas una vez que terminen de iluminarse, y el juego podrá ser finalizado en cualquier momento presionando el botón de Finalizar. El array con la secuencia de números aparece en la consola del navegador.</p>
                        </div>
                    </section>
                    <section className="proyecto">
                        <div className="ps-3 pe-3 border border-light rounded text-light h-100">
                            <p className="mt-3"><b>Buscador</b></p>
                            <p className="mb-4">Se obtienen los personajes de una API de Rick and Morty. En caso de no haber un error, se imprimirán tarjetas con datos e imágenes de los personajes, y el usuario podrá filtrarlos según sus nombres de acuerdo a lo que escriba en un buscador. Además, se podrán aplicar filtros, que incluso pueden actuar combinados, y usar también el buscador para filtrar los resultados según su nombre.</p>
                        </div>
                    </section>
                </div>
                    
                <section className="d-flex justify-content-around mb-4">
                    <a className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-light" href="https://www.linkedin.com/in/matias-d-3094b8208" target="_blank" rel="noreferrer">
                        <img src={LinkedinLogo} alt="Logo de Linkedin" style={{height: "2rem"}}/>
                        <h5>Linkedin</h5>
                    </a>
                    <a className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-light" href="https://github.com/mati-77/React-Playground/tree/main/src/Vistas" target="_blank" rel="noreferrer">
                        <img src={GitHubLogo} alt="Logo de GitHub" style={{height: "2rem"}}/>
                        <h5>GitHub</h5>
                    </a>
                </section>
            </main>
        </Fragment>
    )
}
