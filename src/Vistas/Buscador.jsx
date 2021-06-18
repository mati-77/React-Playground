import React, { useState, useEffect, Fragment, useRef } from 'react';

import '../css/buscador.css'

export default function Buscador() {

    const [personajes, setPersonajes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [huboError, setHuboError] = useState(false)
    const [mostrarMenu, setMostrarMenu] = useState('esconder')
    const [animacionOcultarMenu, setAnimacionOcultarMenu] = useState('')
    const [animacionMostrarMenu, setAnimacionMostrarMenu] = useState('')
    const consulta = useRef()
    const cargando = useRef(true)
    const segunStatus = useRef()
    const nodoGuardado= useRef()
    /* const nodoGuardadoStatus = useRef(null)
    const nodoGuardadoEspecie = useRef(null)
    const nodoGuardadoGenero = useRef(null) */

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

            const desplegarMenuFiltros = () => {
                if(mostrarMenu === 'esconder') {
                    setMostrarMenu('')
                    setAnimacionOcultarMenu('')
                    setAnimacionMostrarMenu('anim-mostrar')
                } else {
                    setAnimacionMostrarMenu('')
                    setAnimacionOcultarMenu('anim-ocultar')
                    setTimeout(() => (
                        setMostrarMenu('esconder')
                    ), 300)
                }
            }


            function seleccBoton(e) {
                nodoGuardado.current = document.getElementById(e.target.id)

                let elementos = document.querySelectorAll(`[data-tipo=${nodoGuardado.current.dataset.tipo}]`)
                let elementosArray = [...elementos]

                let elementosArrayFiltrado = elementosArray.filter(afiltrar => afiltrar.classList.contains("filtro-elegido"))

                if (elementosArrayFiltrado.length > 0) {

                    if (nodoGuardado.current.id !== elementosArrayFiltrado[0].id) {

                        elementosArrayFiltrado.forEach(boton => {
                            boton.classList.remove("filtro-elegido")
                        });

                        nodoGuardado.current.classList.add("filtro-elegido")

                    } else {
                        nodoGuardado.current.classList.remove("filtro-elegido")
                    }

                } else {
                    nodoGuardado.current.classList.add("filtro-elegido")
                }
  
            }



    
            return (
                <Fragment>
                    <nav className="d-flex justify-content-evenly mt-3 mb-3">
                        <button className="boton-filtros" onClick={desplegarMenuFiltros}>Filtros</button>
                        <input type="text" placeholder="Buscar" ref={consulta} onChange={filtrarPorBusqueda}/>
                    </nav>
                    <div className="d-flex flex-wrap justify-content-evenly text-light text-center">
                        <aside className={`menu-lateral ${mostrarMenu} ${animacionMostrarMenu} ${animacionOcultarMenu}`}>
                            <div className="caja-filtros">
                                <p className="fw-bold">Status</p>
                                <div className="opciones-filtros" ref={segunStatus}>
                                    <button type="button" id="vivo" data-tipo="status" data-compar="vivo" onClick={seleccBoton}>Vivo</button>
                                    <button type="button" id="muerto" data-tipo="status" data-compar="muerto" onClick={seleccBoton}>Muerto</button>
                                    <button type="button" id="desconocido-1" data-tipo="status" data-compar="desconocido" onClick={seleccBoton}>Desconocido</button>
                                </div>
                                
                            </div>
                            <div className="caja-filtros">
                                <p className="fw-bold">Especie</p>
                                <div className="opciones-filtros">
                                    <button type="button" id="humana" data-tipo="especie" data-compar="humana" onClick={seleccBoton}>Humana</button>
                                    <button type="button" id="alien" data-tipo="especie" data-compar="alien" onClick={seleccBoton}>Alien</button>
                                </div>
                            </div>
                            <div className="caja-filtros">
                                <p className="fw-bold">Género</p>
                                <div className="opciones-filtros">
                                    <button type="button" id="masculino" data-tipo="genero" data-compar="masculino" onClick={seleccBoton}>Masculino</button>
                                    <button type="button" id="femenino" data-tipo="genero" data-compar="femenino" onClick={seleccBoton}>Femenino</button>
                                    <button type="button" id="desconocido-2" data-tipo="genero" data-compar="desconocido" onClick={seleccBoton}>Desconocido</button>
                                </div>
                                
                            </div>
                        </aside>
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

