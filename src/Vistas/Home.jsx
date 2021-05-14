import React, { Fragment } from 'react';


export default function Home() {
    return (
        <Fragment>
            <main>
                <section className="d-flex justify-content-center align-items-center text-center" style={{height: "10rem"}}>
                    <div>
                        <h2>Hola! Mi nombre es Matias, y soy un frontend developer</h2>
                    </div>
                </section>
                <section>
                    <div>
                        <h3>Tengo conocimientos en:</h3>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>Maquetación mobile first</li>
                            <li>Responsive design</li>
                            <li>React.js</li>
                            <li>Ingles</li>
                        </ul>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}
