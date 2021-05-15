import React, { Fragment } from 'react';
import LinkedinLogo from '../imagenes/linkedin.svg';
import GitHubLogo from '../imagenes/github.svg';


export default function Home() {
    return (
        <Fragment>
            <main>
                <section className="d-flex justify-content-center align-items-center text-center" style={{height: "10rem"}}>
                    <div>
                        <h2>Hola! Mi nombre es Matias, y soy un frontend developer</h2>
                    </div>
                </section>
                <section className="d-flex flex-column justify-content-center align-items-center ps-3 pe-3 text-center">
                    <h5 className="mb-3">Bienvenido/a a mi primer projecto con React.js y Bootstrap. Acá vas a encontrar demostraciones de lo que puedo hacer hasta el momento.</h5>
                    <p>Busco seguir capacitándome en Desarrollo Web Frontend, colaborar en una posición acorde a esos conocimientos, y, eventualmente, capacitarme también en Backend y convertirme en un Fullstack Developer. <br />
                    Tengo conocimientos y habilidades en responsive design, maquetación mobile first, Git y GitHub, e ingles.
                    Actualmente estoy aprendiendo React.js con componentes funcionales y Hooks.</p>
                </section>
                <section className="d-flex justify-content-around">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <a href="https://www.linkedin.com/in/matias-d-3094b8208"><img src={LinkedinLogo} alt="Logo de Linkedin" className="icon-height"/></a>
                        <h5>Linkedin</h5>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <a href="https://github.com/mati-77/React-Playground"><img src={GitHubLogo} alt="Logo de GitHub" className="icon-height"/></a>
                        <h5>GitHub</h5>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}
