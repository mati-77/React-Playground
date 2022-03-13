import React from 'react';

export default function ({filtradoPorBusqueda}) {
    let card
    if (filtradoPorBusqueda.length > 0) {
        card = filtradoPorBusqueda.map(personaje => (
                <div className="tarjeta" key={personaje.id}>
                    <img className="imagen-tarjeta" src={personaje.image} alt={`imagen de ${personaje.name}`} />
                    <div className="descripcion-tarjeta">
                        <h2>{personaje.name}</h2>
                        <h5>Status: {personaje.status}</h5>
                        <h5>Species: {personaje.species}</h5>
                        <h5>Gender: {personaje.gender}</h5>
                    </div>
                </div>
        ))
        return card;
    } else {
        card = <h1>No se encontraron resultados</h1>
        return card;
    }
}