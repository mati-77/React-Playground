import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Proyecto( {titulo, descripcion, url, ruta, imagen} ) {

    const [visibilidad, setVisibilidad] = useState("notvisible")
    const [animacionMostrar, setAnimacionMostrar] = useState("")


    function mostrarDescripcion (e) {
            e.stopPropagation()
            !visibilidad ? setVisibilidad("notvisible") : setVisibilidad("")
            !animacionMostrar ? setAnimacionMostrar("anim-mostrar") : setAnimacionMostrar("")
        }
    

    return (
        <div className="proyecto" onClick={mostrarDescripcion}>
            <div className={imagen}></div>
            <div className={`proyecto--descripcion ${visibilidad} ${animacionMostrar}`}>
                <div className="nombreYResumen">
                    <p className="mt-3" style={{fontSize: "2rem"}}><b>{titulo}</b></p>
                    <p className="texto--descripcion">{descripcion}</p>
                </div>
                <div className="enlacesProyecto">
                    <a href={`https://github.com/mati-77/React-Playground/blob/main/src/Vistas/${url}`} target="_blank" rel="noreferrer" >Ver código</a>
                    <Link to={ruta}>Ver proyecto</Link>
                </div>
            </div>
        </div>
    )
}