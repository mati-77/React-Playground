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
    const nodoGuardado= useRef()

    const arrayStatus = useRef([])
    const arrayEspecie = useRef([])
    const arrayGenero = useRef([])

    const [hayFiltroStatus, setHayFiltroStatus] = useState(false)
    const [hayFiltroEspecie, setHayFiltroEspecie] = useState(false)
    const [hayFiltroGenero, setHayFiltroGenero] = useState(false)

    const [valorFiltroStatus, setValorFiltroStatus] = useState("")
    const [valorFiltroEspecie, setValorFiltroEspecie] = useState("")
    const [valorFiltroGenero, setValorFiltroGenero] = useState("")


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

            function aplicarFiltro(tipo, valor) {
                if (tipo === "status") {
                    arrayStatus.current = personajes.filter(p => p.status.includes(valor))
                    setValorFiltroStatus(valor)
                    setHayFiltroStatus(true)
                } else if (tipo === "especie") {
                    arrayEspecie.current = personajes.filter(p => p.species.includes(valor))
                    setValorFiltroEspecie(valor)
                    setHayFiltroEspecie(true)
                } else if (tipo === "genero") {
                    arrayGenero.current = personajes.filter(p => p.gender.includes(valor))
                    setValorFiltroGenero(valor)
                    setHayFiltroGenero(true)
                }
            }

            function removerFiltro(tipo) {
                if (tipo === "status") {
                    arrayStatus.current = []
                    setValorFiltroStatus("")
                    setHayFiltroStatus(false)
                } else if (tipo === "especie") {
                    arrayEspecie.current = []
                    setValorFiltroEspecie("")
                    setHayFiltroEspecie(false)
                } else if (tipo === "genero") {
                    arrayGenero.current = []
                    setValorFiltroGenero("")
                    setHayFiltroGenero(false)
                }
            }


            function seleccBoton(e) {
                e.stopPropagation()
                nodoGuardado.current = document.getElementById(e.target.id)

                let elementos = document.querySelectorAll(`[data-tipo=${nodoGuardado.current.dataset.tipo}]`)
                let elementosArray = [...elementos]

                let elementosArrayFiltrado = elementosArray.filter(afiltrar => afiltrar.classList.contains("filtro-elegido"))

                if (elementosArrayFiltrado.length > 0) {
                    if (nodoGuardado.current.id !== elementosArrayFiltrado[0].id) {
                        elementosArrayFiltrado[0].classList.remove("filtro-elegido")
                        removerFiltro(elementosArrayFiltrado[0].dataset.tipo)
                        nodoGuardado.current.classList.add("filtro-elegido")
                        aplicarFiltro(nodoGuardado.current.dataset.tipo, nodoGuardado.current.dataset.filtro)
                    } else {
                        nodoGuardado.current.classList.remove("filtro-elegido")
                        removerFiltro(nodoGuardado.current.dataset.tipo)
                    }
                } else {
                    nodoGuardado.current.classList.add("filtro-elegido")
                    aplicarFiltro(nodoGuardado.current.dataset.tipo, nodoGuardado.current.dataset.filtro)
                }
            }

            let filtradoPorBusqueda = []

            if (hayFiltroStatus || hayFiltroEspecie || hayFiltroGenero) {
                let arraysFiltradosPorBotones = [...arrayStatus.current, ...arrayEspecie.current, ...arrayGenero.current]
                let eliminarDuplicados = [...new Set(arraysFiltradosPorBotones) ]
                let filtroFinal = eliminarDuplicados.filter((elemento) => elemento.status.includes(valorFiltroStatus) && elemento.species.includes(valorFiltroEspecie) && elemento.gender.includes(valorFiltroGenero))
                filtradoPorBusqueda = filtroFinal.filter((user) => {
                    return user.name.toLowerCase().includes(busqueda.toLowerCase())
                })
            } else {
                filtradoPorBusqueda = personajes.filter((user) => {
                    return user.name.toLowerCase().includes(busqueda.toLowerCase())
                })
            }

    
            return (
                <Fragment>
                    <nav className="d-flex justify-content-evenly mt-3 mb-3">
                        <button className="boton-filtros" onClick={desplegarMenuFiltros}>Filtros</button>
                        <input type="text" placeholder="Buscar" ref={consulta} onChange={filtrarPorBusqueda}/>
                    </nav>
                    <div className="d-flex flex-wrap justify-content-evenly text-light text-center">
                        <div className={`menu-filtros ${mostrarMenu} ${animacionMostrarMenu} ${animacionOcultarMenu}`} onClick={desplegarMenuFiltros}>
                            <div className="caja-filtros">
                                <p className="fw-bold">Status</p>
                                <div className="opciones-filtros">
                                    <button type="button" id="vivo" data-tipo="status" data-filtro="Alive" onClick={seleccBoton}>Vivo</button>
                                    <button type="button" id="muerto" data-tipo="status" data-filtro="Dead" onClick={seleccBoton}>Muerto</button>
                                    <button type="button" id="desconocido-1" data-tipo="status" data-filtro="unknown" onClick={seleccBoton}>Desconocido</button>
                                </div>
                                
                            </div>
                            <div className="caja-filtros">
                                <p className="fw-bold">Especie</p>
                                <div className="opciones-filtros">
                                    <button type="button" id="humana" data-tipo="especie" data-filtro="Human" onClick={seleccBoton}>Humana</button>
                                    <button type="button" id="alien" data-tipo="especie" data-filtro="Alien" onClick={seleccBoton}>Alien</button>
                                </div>
                            </div>
                            <div className="caja-filtros">
                                <p className="fw-bold">Género</p>
                                <div className="opciones-filtros">
                                    <button type="button" id="masculino" data-tipo="genero" data-filtro="Male" onClick={seleccBoton}>Masculino</button>
                                    <button type="button" id="femenino" data-tipo="genero" data-filtro="Female" onClick={seleccBoton}>Femenino</button>
                                    <button type="button" id="desconocido-2" data-tipo="genero" data-filtro="unknown" onClick={seleccBoton}>Desconocido</button>
                                </div>
                                
                            </div>
                        </div>
                        {
                            filtradoPorBusqueda.map(personaje => (
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
                        }
                    </div>
                </Fragment>
            )
        }
    }
}

