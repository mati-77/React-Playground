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

    const arraysFiltros = useRef({
        status: [],
        species: [],
        gender: []
    })

    const [hayFiltros, setHayFiltros] = useState(false)

    const [valoresDeFiltro, setValoresDeFiltro] = useState({
        status: "",
        species: "",
        gender: ""
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

    function aplicarQuitarFiltro(tipo, accion, valor = null) {
        if (accion === "aplicar") {
            arraysFiltros.current[tipo] = personajes.filter(p => p[tipo].includes(valor))
            cambiarValoresDeFiltro(tipo, valor)
        } else {
            arraysFiltros.current[tipo].length = 0
            cambiarValoresDeFiltro(tipo)
        }

        if (arraysFiltros.current.status.length > 0 || arraysFiltros.current.species.length > 0 || arraysFiltros.current.gender.length > 0) {
            setHayFiltros(true)
        } else {
            setHayFiltros(false)
        }
    }


    function seleccBoton(e) {
        e.stopPropagation()
        nodoGuardado.current = document.getElementById(e.target.id)

        let elementosArray = [...(document.querySelectorAll(`[data-tipo=${nodoGuardado.current.dataset.tipo}]`))]
        console.log(elementosArray)

        let elementoEncontrado = elementosArray.find(elemento => elemento.classList.contains("filtro-elegido"))

        console.log(elementoEncontrado)
        console.log(nodoGuardado.current)

        if (elementoEncontrado) {
            if (nodoGuardado.current.id !== elementoEncontrado.id) {
                elementoEncontrado.classList.remove("filtro-elegido")
                aplicarQuitarFiltro(elementoEncontrado.dataset.tipo, "remover")
                nodoGuardado.current.classList.add("filtro-elegido")
                aplicarQuitarFiltro(nodoGuardado.current.dataset.tipo, "aplicar", nodoGuardado.current.dataset.filtro)
            } else {
                nodoGuardado.current.classList.remove("filtro-elegido")
                aplicarQuitarFiltro(nodoGuardado.current.dataset.tipo, "remover")
            }
        } else {
            nodoGuardado.current.classList.add("filtro-elegido")
            aplicarQuitarFiltro(nodoGuardado.current.dataset.tipo, "aplicar", nodoGuardado.current.dataset.filtro)
        }
    }

    if (hayFiltros) {
        let arraysFiltradosPorBotones = [...arraysFiltros.current.status, ...arraysFiltros.current.species, ...arraysFiltros.current.gender]
        let eliminarDuplicados = [...new Set(arraysFiltradosPorBotones) ]
        let filtroFinal = eliminarDuplicados.filter((elemento) => elemento.status.includes(valoresDeFiltro.status) && elemento.species.includes(valoresDeFiltro.species) && elemento.gender.includes(valoresDeFiltro.gender))
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

