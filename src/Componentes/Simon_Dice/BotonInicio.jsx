import React, { useState, useEffect, useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function BotonInicio() {

    const {encendido, setIniciar, finalizar, setFinalizar} = useContext(SimonContext)
 
    let clases = `btn btn-success text-nowrap btn-sm w-30 ${finalizar ? '' : 'disabled'}`

    function encender() {
        setIniciar(true)
        setFinalizar(false)
    }


    /*cuando este boton se apreta, cambia el estado de iniciar (el BotonFinalizar se vuelve disponible)
    y cambia el estado finalizar (este boton se vuelve no disponible).*/

    return (
        <button id="inicio" type="button" onClick={encender} className={clases}>Comenzar el juego</button>
    )
}