import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';



export default function LuzVerde() {

    const {estadoLuzVerde, numeroDeBoton, clickBoton} = useContext(SimonContext)

    let clasesLuzVerde = `luz-verde ${estadoLuzVerde}`

    function devolverNumeroYActivar() {
        numeroDeBoton.current = 1
        clickBoton.current()
    }

    return (
        <div id="verde" className={clasesLuzVerde} data-color="verde" onClick={devolverNumeroYActivar}></div>
    )
}

