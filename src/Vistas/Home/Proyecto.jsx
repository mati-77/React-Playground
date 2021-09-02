import React from 'react';
import { Link } from 'react-router-dom';


export default function Proyecto( {titulo, descripcion, url, ruta, imagen} ) {
    return (
        <section className="proyecto">
            <div className={imagen}></div>
            <div className="proyecto--descripcion">
                <p className="mt-3"><b>{titulo}</b></p>
                <p className="texto--descripcion">{descripcion}</p>
                <div className="enlacesProyecto">
                    <a href={`https://github.com/mati-77/React-Playground/blob/main/src/Vistas/${url}`} target="_blank" rel="noreferrer">Ver código</a>
                    <Link to={ruta}>Ver proyecto</Link>
                </div>
            </div>
        </section>
    )
}