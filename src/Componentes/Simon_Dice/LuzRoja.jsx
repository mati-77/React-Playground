import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function LuzRoja() {

    const {estadoLuzRoja, numeroDeBoton, clickBoton} = useContext(SimonContext)

    let clasesLuzRoja = `luz-roja ${estadoLuzRoja}`

    function devolverNumeroYActivar() {
        numeroDeBoton.current = 2
        clickBoton.current()
    }

    return (
        <div id="roja" className={clasesLuzRoja} data-color="rojo" onClick={devolverNumeroYActivar}></div>
    )
}