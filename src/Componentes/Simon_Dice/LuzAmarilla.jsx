import React, { useContext } from 'react'
import { SimonContext } from '../../contexts/SimonContext'

export default function LuzAmarilla() {

    const { estadoLuzAmarilla, numeroDeBoton, clickBoton } = useContext(SimonContext)

    let clasesLuzAmarilla = `luz-amarilla ${estadoLuzAmarilla}`

    function devolverNumeroYActivar() {
        numeroDeBoton.current = 3
        clickBoton.current()
    }

    return (
        <div className={clasesLuzAmarilla} data-color="amarillo" onClick={devolverNumeroYActivar}></div>
    )
}