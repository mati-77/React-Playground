import React, { useState, useEffect, Fragment, useRef } from 'react';
import MensajeError from './MensajeError';
import MensajeCargando from './MensajeCargando';
import Personajes from './Personajes';
import MenuFiltros from './MenuFiltros';
import FiltroYBusqueda from './FiltroYBusqueda';

import './buscador.css';

export default function Buscador() {

    const [personajes, setPersonajes] = useState([])

    /**
     * Este estado se usará para filtrar personajes segun el nombre
     * escrito por el usuario.
     */
    const [busqueda, setBusqueda] = useState('')
    
    const [huboError, setHuboError] = useState(false)

    const [mostrarMenu, setMostrarMenu] = useState('esconder')
    const [animacionOcultarMenu, setAnimacionOcultarMenu] = useState('')
    const [animacionMostrarMenu, setAnimacionMostrarMenu] = useState('')

    /**Referencia al boton del filtro que el usuario elige */
    const nodoGuardado= useRef()

    /**
     * Por cada tipo de filtro aplicado, se llenará un array con los personajes
     * que coincidan con lo que eligió el usuario.
     */
    const arraysFiltros = useRef({
        status: [],
        species: [],
        gender: []
    })

    const [hayFiltros, setHayFiltros] = useState(false)


    /**
     * Este estado se usará para definir el array final de personajes filtrados mediante opciones de filtro.
     */
    const [valoresDeFiltro, setValoresDeFiltro] = useState({
        status: "",
        species: "",
        gender: ""
    })

    /**
     * Si el usuario busca personajes por nombre, habiendo ademas elegido filtros o no,
     * los resultados se guardarán en este array.
     */
    let filtradoPorBusqueda = []

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        .then((respuesta) => respuesta.ok ? Promise.resolve(respuesta.json()) : Promise.reject(true))
        .then(data => setPersonajes(data.results))
        .catch((error) => setHuboError(error))
    }, [])

    if (huboError) return <MensajeError />

    if (personajes.length === 0) return <MensajeCargando />

    /**
     * Función que modifica el estado de busqueda, que se usará
     * para filtrar personajes segun el nombre escrito por el usuario.
     * @param {Event} e 
     */
    function filtrarPorBusqueda(e){
        setBusqueda(e.target.value)
    } 

    /**
     * Función que se encarga de mostrar u ocultar el menú de filtros
     */
    function desplegarMenuFiltros() {
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

    /**
     * Función que modifica el estado de valoresDeFiltro según el tipo de filtro y el valor de filtrado recibidos.
     * @param {String} tipo El tipo de filtro a aplicar.
     * @param {String} [valor] Valor que se usará para filtrar. Es un string vacío por defecto.
     */
    function cambiarValoresDeFiltro(tipo, valor = "") {
        setValoresDeFiltro(valoresDeFiltro => ({...valoresDeFiltro, [tipo] : valor}) )
    }

    /**
     * Función que rellena o vacía los arrays que se usarán
     * para el filtrado inicial por opciones de filtro, y dicta el cambio de
     * valoresDeFiltro, segun la acción recibida.
     * @param {String} tipo Define el array a rellenar o vaciar y el tipo
     * @param {String} accion Definirá qué se hace con el array y qué 
     * argumentos recibirá la función cambiarValoresDeFiltro.
     * @param {String|null} [valor] Valor elegido por el usuario, 
     * que se usará para filtrar a los personajes obtenidos inicialmente a traves de la API.
     * 
     */
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


    /**
     * Función que se encarga del resaltado de las opciones de 
     * filtro elegidas en el menú, e invoca a la función aplicarQuitarFiltro.
     * @param {Event} e 
     */
    function seleccBoton(e) {
        e.stopPropagation()

        nodoGuardado.current = document.getElementById(e.target.id)

        let elementosArray = [...(document.querySelectorAll(`[data-tipo=${nodoGuardado.current.dataset.tipo}]`))]

        let elementoEncontrado = elementosArray.find(elemento => elemento.classList.contains("filtro-elegido"))

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
                    filtrarPorBusqueda={filtrarPorBusqueda} 
                    desplegarMenuFiltros={desplegarMenuFiltros}
                />
                <div className="contenedor-tarjetas">
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

