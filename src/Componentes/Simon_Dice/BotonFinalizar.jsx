import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function BotonFinalizar() {

    const {finalizar, setFinalizar, encendido, setEncendido} = useContext(SimonContext)

    let clases = `btn btn-warning text-nowrap btn-sm w-30 ${encendido ? '' : 'disabled'}`

    function fin() {
        setFinalizar(true)
        setEncendido(false)
    }

    /*cuando este boton se apreta, cambia el estado de finalizar (el BotonInicio se vuelve disponible)
    y cambia el estado encendido (este boton se vuelve no disponible).*/

    return (
        <button id="fin" type="button" onClick={fin} className={clases}>Finalizar el juego</button>
    )
}