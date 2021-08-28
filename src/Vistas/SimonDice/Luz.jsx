import React, { useContext } from 'react'
import { SimonContext } from '../../contexts/SimonContext'

export default function Luz(props) {

    const { numeroDeBoton, clickBoton } = useContext(SimonContext)


    function devolverNumeroYActivar() {
        numeroDeBoton.current = props.numColor
        clickBoton.current()
    }

    return (
        <div className={props.clasesLuz} data-color={props.dataColor} onClick={devolverNumeroYActivar}></div>
    )
}