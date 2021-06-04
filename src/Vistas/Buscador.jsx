import React, { useState, useEffect, Fragment, useRef } from 'react';
import Buscar from '../Componentes/Buscador/Buscar';

export default function Buscador() {

    const [personajes, setPersonajes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [huboError, setHuboError] = useState(false)
    const consulta = useRef()

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

        const filtrarPorBusqueda = () => {
            console.log(consulta.current.value)
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
                <div className="text-light text-center">
                    {
                        filtradoPorBusqueda.map(personaje => <h2>{personaje.name}</h2>)
                    }
                </div>
            </Fragment>
            
        )


        
    }


    
}

