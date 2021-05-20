import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function BotonFinalizar() {

    const {finalizar, setFinalizar, iniciar, setIniciar} = useContext(SimonContext)

    let clases = `btn btn-warning text-nowrap btn-sm w-30 ${iniciar ? '' : 'disabled'}`

    function fin() {
        setFinalizar(true)
        setIniciar(false)
    }

    /*cuando este boton se apreta, cambia el estado de finalizar (el BotonInicio se vuelve disponible)
    y cambia el estado iniciar (este boton se vuelve no disponible).*/

    return (
        <button id="fin" type="button" onClick={fin} className={clases}>Finalizar el juego</button>
    )
}