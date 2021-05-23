import React, { useContext } from 'react'
import { SimonContext } from '../../contexts/SimonContext'

export default function LuzAzul() {

    const { estadoLuzAzul, botonAzul } = useContext(SimonContext)

    let clasesLuzAzul = `luz-azul ${estadoLuzAzul}`

    return (
        <div id="azul" className={clasesLuzAzul} ref={botonAzul} data-color="azul"></div>
    )
}