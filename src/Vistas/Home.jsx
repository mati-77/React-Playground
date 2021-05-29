import React, { Fragment } from 'react';
import LinkedinLogo from '../imagenes/linkedin.svg';
import GitHubLogo from '../imagenes/github.svg';

import '../css/home.css'


export default function Home() {
    return (
        <Fragment>
            <main className="home d-flex flex-column justify-content-evenly">
                <section className="d-flex justify-content-center align-items-center text-center" style={{height: "5rem"}}>
                    <div>
                        <h2>Hola! Mi nombre es Matias, y soy un frontend developer Jr.</h2>
                    </div>
                </section>
                <section className="d-flex flex-column justify-content-center align-items-center ps-3 pe-3 text-center">
                    <h5 className="mb-3">Bienvenido/a a mi primer proyecto desarrollado con React.js. Acá vas a encontrar demostraciones de lo que puedo hacer hasta el momento. Podés acceder a cada demostración desde la barra de navegación</h5>
                    <p><b>Simón Dice</b></p>
                    <p>Es un juego de memoria de diez niveles. Cada vez que se hace click en el botón de inicio, se genera un array con una secuencia de números, que se corresponden con los cuatro colores del juego. De acuerdo al nivel, se iluminará una cantidad de luces, que el usuario deberá presionar. Las luces solo podrán ser presionadas una vez que terminen de iluminarse, y el juego podrá ser finalizado en cualquier momento presionando el botón de Finalizar. El array con la secuencia de números aparece en la consola del navegador.</p>
                </section>
                <section className="d-flex justify-content-around">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <a href="https://www.linkedin.com/in/matias-d-3094b8208"><img src={LinkedinLogo} alt="Logo de Linkedin" style={{height: "2rem"}}/></a>
                        <h5>Linkedin</h5>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <a href="https://github.com/mati-77/React-Playground/tree/main/src/Vistas"><img src={GitHubLogo} alt="Logo de GitHub" style={{height: "2rem"}}/></a>
                        <h5>GitHub</h5>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}
