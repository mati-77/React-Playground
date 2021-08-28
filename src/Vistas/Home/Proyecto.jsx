import React from 'react';
import { Link } from 'react-router-dom';


export default function Proyecto( {titulo, descripcion, url, ruta} ) {
    return (
        <section className="proyecto">
            <div className="d-flex flex-column justify-content-evenly ps-3 pe-3 border border-light rounded text-light h-100">
                <p className="mt-3"><b>{titulo}</b></p>
                <p className="mb-4">{descripcion}</p>
                <div className="enlacesProyecto">
                    <a href={`https://github.com/mati-77/React-Playground/blob/main/src/Vistas/${url}`} target="_blank" rel="noreferrer">Ver código</a>
                    <Link to={ruta}>Ver proyecto</Link>
                </div>
            </div>
        </section>
    )
}