import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function BotonFinalizar() {

    const {setFinalizar, iniciar, setIniciar, botonDeFin, nivel } = useContext(SimonContext)

    let clases = `btn btn-warning text-nowrap w-30 ${iniciar ? '' : 'disabled'}`

    function fin() {
        setFinalizar(true)
        setIniciar(false)
        nivel.current = ''
    }

    /*cuando este boton se apreta, cambia el estado de finalizar (el BotonInicio se vuelve disponible)
    y cambia el estado iniciar (este boton se vuelve no disponible).*/

    return (
        <button type="button" ref={botonDeFin} onClick={fin} className={clases}>Finalizar el juego</button>
    )
}