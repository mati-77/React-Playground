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

    let filtradoPorBusqueda = []

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        .then((respuesta) => respuesta.ok ? Promise.resolve(respuesta.json()) : Promise.reject(true))
        .then(data => setPersonajes(data.results))
        .catch((error) => setHuboError(error))
    }, [])

    if (huboError) return <MensajeError />

    if (personajes.length > 0) cargando.current = false
    
    if(cargando.current) return <MensajeCargando />

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

