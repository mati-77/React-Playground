import React from 'react';

export default function Enlace( {imagen, url, alt, texto} ) {
    return(
        <a className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-light" href={url} target="_blank" rel="noreferrer" style={{height: "10rem", width: "10rem"}}>
            <img src={imagen} alt={alt} style={{height: "4rem"}}/>
            <h5 style={{fontSize: "2rem"}}>{texto}</h5>
        </a>
    )
}