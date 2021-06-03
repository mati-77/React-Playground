import React, { useState, useEffect, Fragment } from 'react';
import Buscar from '../Componentes/Buscador/Buscar';

export default function Buscador() {

    const [personajes, setPersonajes] = useState([])

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        .then(respuesta => respuesta.json())
        .then(data => setPersonajes(data.results))
    }, [])

    return (
        <Fragment>
            <Buscar />
            <div className="text-light text-center">
                {
                    personajes.map(personaje => <h2>{personaje.name}</h2>)
                }
            </div>
        </Fragment>
        
    )
}

