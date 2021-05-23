import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';



export default function LuzVerde() {

    const {estadoLuzVerde, botonVerde, numeroDeBotonVerde} = useContext(SimonContext)

    let clasesLuzVerde = `luz-verde ${estadoLuzVerde}`

    function devolverNumero() {
        numeroDeBotonVerde.current = 1
        console.log(numeroDeBotonVerde.current)
    }

    return (
        <div id="verde" className={clasesLuzVerde} ref={botonVerde} data-color="verde" onClick={devolverNumero}></div>
    )
}

