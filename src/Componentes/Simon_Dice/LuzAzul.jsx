import React, { useContext } from 'react'
import { SimonContext } from '../../contexts/SimonContext'

export default function LuzAzul() {

    const { estadoLuzAzul } = useContext(SimonContext)

    let clasesLuzAzul = `luz-azul ${estadoLuzAzul}`

    return (
        <div id="azul" className={clasesLuzAzul}></div>
    )
}