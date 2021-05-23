import React, { useContext } from 'react'
import { SimonContext } from '../../contexts/SimonContext'

export default function LuzAmarilla() {

    const { estadoLuzAmarilla, botonAmarillo } = useContext(SimonContext)

    let clasesLuzAmarilla = `luz-amarilla ${estadoLuzAmarilla}`

    return (
        <div id="amarilla" className={clasesLuzAmarilla} ref={botonAmarillo} data-color="amarillo"></div>
    )
}