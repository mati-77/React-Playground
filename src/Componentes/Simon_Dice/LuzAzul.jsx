import React, { useContext } from 'react'
import { SimonContext } from '../../contexts/SimonContext'

export default function LuzAzul() {

    const { estadoLuzAzul, numeroDeBoton, clickBoton } = useContext(SimonContext)

    let clasesLuzAzul = `luz-azul ${estadoLuzAzul}`

    function devolverNumeroYActivar() {
        numeroDeBoton.current = 4
        clickBoton.current()
    }

    return (
        <div id="azul" className={clasesLuzAzul} data-color="azul" onClick={devolverNumeroYActivar}></div>
    )
}