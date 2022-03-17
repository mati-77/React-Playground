import React, { useState, useEffect, Fragment, useRef } from 'react';
import MensajeError from './MensajeError';
import MensajeCargando from './MensajeCargando';
import Personajes from './Personajes';
import MenuFiltros from './MenuFiltros';
import FiltroYBusqueda from './FiltroYBusqueda';

import './buscador.css';

export default function Buscador() {

    const [personajes, setPersonajes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [huboError, setHuboError] = useState(false)

    const [mostrarMenu, setMostrarMenu] = useState('esconder')
    const [animacionOcultarMenu, setAnimacionOcultarMenu] = useState('')
    const [animacionMostrarMenu, setAnimacionMostrarMenu] = useState('')

    /**Referencia al input para buscar por nombre */
    const consulta = useRef()
    /**Referencia al boton del filtro que el usuario elige */
    const nodoGuardado= useRef()

    const arrayStatus = useRef([])
    const arrayEspecie = useRef([])
    const arrayGenero = useRef([])

    const [hayFiltros, setHayFiltros] = useState(false)

    const [valoresDeFiltro, setValoresDeFiltro] = useState({
        status: "",
        especie: "",
        genero: ""
    })

    let filtradoPorBusqueda = []

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        .then((respuesta) => respuesta.ok ? Promise.resolve(respuesta.json()) : Promise.reject(true))
        .then(data => setPersonajes(data.results))
        .catch((error) => setHuboError(error))
    }, [])

    if (huboError) return <MensajeError />

    if (personajes.length === 0) return <MensajeCargando />

    const filtrarPorBusqueda = () => setBusqueda(consulta.current.value)

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

    function cambiarValoresDeFiltro(tipo, valor = "") {
        setValoresDeFiltro(valoresDeFiltro => ({...valoresDeFiltro, [tipo] : valor}) )
    }


    function manejarFiltros(tipo, accion, valor = null) {
        if (tipo === "status") {
            accion === "aplicar" ? arrayStatus.current = personajes.filter(p => p.status.includes(valor)) : arrayStatus.current.length = 0
            accion === "aplicar" ? cambiarValoresDeFiltro(tipo, valor) : cambiarValoresDeFiltro(tipo)
            console.log(tipo)
        } else if (tipo === "especie") {
            accion === "aplicar" ? arrayEspecie.current = personajes.filter(p => p.species.includes(valor)) : arrayEspecie.current.length = 0
            accion === "aplicar" ? cambiarValoresDeFiltro(tipo, valor) : cambiarValoresDeFiltro(tipo)
            console.log(tipo)
        } else if (tipo === "genero") {
            accion === "aplicar" ? arrayGenero.current = personajes.filter(p => p.gender.includes(valor)) : arrayGenero.current.length = 0
            accion === "aplicar" ? cambiarValoresDeFiltro(tipo, valor) : cambiarValoresDeFiltro(tipo)
            console.log(tipo)
        }

        if (arrayStatus.current.length > 0 || arrayEspecie.current.length > 0 || arrayGenero.current.length > 0) {
            setHayFiltros(true)
        } else {
            setHayFiltros(false)
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
                manejarFiltros(elementosArrayFiltrado[0].dataset.tipo, "remover")
                nodoGuardado.current.classList.add("filtro-elegido")
                manejarFiltros(nodoGuardado.current.dataset.tipo, "aplicar", nodoGuardado.current.dataset.filtro)
            } else {
                nodoGuardado.current.classList.remove("filtro-elegido")
                manejarFiltros(nodoGuardado.current.dataset.tipo, "remover")
            }
        } else {
            nodoGuardado.current.classList.add("filtro-elegido")
            manejarFiltros(nodoGuardado.current.dataset.tipo, "aplicar", nodoGuardado.current.dataset.filtro)
        }
    }

    if (hayFiltros) {
        let arraysFiltradosPorBotones = [...arrayStatus.current, ...arrayEspecie.current, ...arrayGenero.current]
        let eliminarDuplicados = [...new Set(arraysFiltradosPorBotones) ]
        let filtroFinal = eliminarDuplicados.filter((elemento) => elemento.status.includes(valoresDeFiltro.status) && elemento.species.includes(valoresDeFiltro.especie) && elemento.gender.includes(valoresDeFiltro.genero))
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
            <div>
                <FiltroYBusqueda 
                    consulta={consulta} 
                    filtrarPorBusqueda={filtrarPorBusqueda} 
                    desplegarMenuFiltros={desplegarMenuFiltros}
                />
                <div className="d-flex flex-wrap justify-content-evenly text-light text-center" style={{overflow : "hidden", paddingTop : "11rem"}}>
                    <MenuFiltros 
                        mostrarMenu={mostrarMenu} 
                        animacionMostrarMenu={animacionMostrarMenu} 
                        animacionOcultarMenu={animacionOcultarMenu} 
                        desplegarMenuFiltros={desplegarMenuFiltros} 
                        seleccBoton={seleccBoton}
                    />
                    <Personajes filtradoPorBusqueda={filtradoPorBusqueda}/>
                </div>
            </div>
        </Fragment>
    )
        
    
}

