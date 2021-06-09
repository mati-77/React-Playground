import React, { useState, useEffect, Fragment, useRef } from 'react';

import '../css/buscador.css'

export default function Buscador() {

    const [personajes, setPersonajes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [huboError, setHuboError] = useState(false)
    const consulta = useRef()
    const cargando = useRef(true)

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        .then((respuesta) => respuesta.ok ? Promise.resolve(respuesta.json()) : Promise.reject(true))
        .then(respuesta => setPersonajes(respuesta.results))
        .catch((e) => setHuboError(e))
    }, [])

   
    if(huboError) {

        return (
            <div className="d-flex justify-content-center align-items-center mt-3 mb-3 text-light h-100 ps-3 pe-3">
                <h3>Parece que hubo algun tipo de error! La información necesaria para cargar esto parece no estar disponible por el momento.</h3>
            </div>
        )

    } else {

        if (personajes.length > 0) {
            cargando.current = huboError
        }
        
        if(cargando.current) {
            return (
                <div className="d-flex justify-content-center align-items-center mt-3 mb-3 text-light h-100 ps-3 pe-3">
                    <h1>Cargando...</h1>
                </div>
            )
        } else {
            const filtrarPorBusqueda = () => {
                setBusqueda(consulta.current.value)
            }

            const filtradoPorBusqueda = personajes.filter((user) => {
                return user.name.toLowerCase().includes(busqueda.toLowerCase())
            })

    
            return (
                <Fragment>
                    <div className="d-flex justify-content-center mt-3 mb-3">
                        <input type="text" placeholder="Buscar" ref={consulta} onChange={filtrarPorBusqueda}/>
                    </div>
                    <div className="d-flex flex-wrap justify-content-evenly text-light text-center">
                        {
                            filtradoPorBusqueda.map(personaje => (
                                <div className="tarjeta" key={personaje.id}>
                                    <img className="imagen-tarjeta" src={personaje.image} alt="Imagen de personaje" />
                                    <div className="descripcion-tarjeta">
                                        <h2>{personaje.name}</h2>
                                        <h5>Status: {personaje.status}</h5>
                                        <h5>Species: {personaje.species}</h5>
                                        <h5>Gender: {personaje.gender}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Fragment>
            )
        }
    }
}

