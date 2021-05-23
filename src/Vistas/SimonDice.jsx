import React, { useState, useEffect, useRef } from 'react';

import { SimonContext } from '../contexts/SimonContext';

import BotonInicio from '../Componentes/Simon_Dice/BotonInicio';
import BotonFinalizar from '../Componentes/Simon_Dice/BotonFinalizar';
import LucesSimon from '../Componentes/Simon_Dice/LucesSimon';

/* import { LuzVerde, mostrar } from '../Componentes/Simon_Dice/LuzVerde'; */




export default function SimonDice() {

    const [iniciar, setIniciar] = useState(false)
    const [finalizar, setFinalizar] = useState(true)

    const [estadoLuzVerde, setEstadoLuzVerde] = useState('')
    const [estadoLuzRoja, setEstadoLuzRoja] = useState('')
    const [estadoLuzAmarilla, setEstadoLuzAmarilla] = useState('')
    const [estadoLuzAzul, setEstadoLuzAzul] = useState('')
    

    /* const [nivel, setNivel] = useState('') */

    const botonVerde = useRef()
    const numeroDeBotonVerde = useRef(0)
    const botonRojo = useRef()
    const botonAmarillo = useRef()
    const botonAzul = useRef()
    const botonDeFin = useRef()

    const nivel = useRef('')

    const state = {iniciar, setIniciar, finalizar, setFinalizar, estadoLuzVerde, setEstadoLuzVerde, estadoLuzRoja, setEstadoLuzRoja, estadoLuzAmarilla, setEstadoLuzAmarilla, estadoLuzAzul, setEstadoLuzAzul, botonVerde, botonRojo, botonAmarillo, botonAzul, botonDeFin, nivel, numeroDeBotonVerde}

    

    
    const subNivel = useRef()

    const timeOuts = useRef([])
    
    console.log(numeroDeBotonVerde.current)

    const NIVEL_MAXIMO = 10

    /* console.log(botonVerde) */

    
    useEffect(() => {

        let secuencia = new Array(NIVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*4 + 1))



        function encenderLuz(numero) {
            switch (numero) {
                case 1:
                    return setEstadoLuzVerde('verde-iluminada') 
                case 2:
                    return setEstadoLuzRoja('roja-iluminada')
                case 3:
                    return setEstadoLuzAmarilla('amarilla-iluminada')
                case 4:
                    return setEstadoLuzAzul('azul-iluminada')
            }
        }

        function apagarLuz(numero) {
            switch (numero) {
                case 1:
                    return setEstadoLuzVerde('') 
                case 2:
                    return setEstadoLuzRoja('')
                case 3:
                    return setEstadoLuzAmarilla('')
                case 4:
                    return setEstadoLuzAzul('')
            }
        }

        function iluminarApagar(numeroLuz) { 
                
            encenderLuz(numeroLuz)
            setTimeout(() => {
            apagarLuz(numeroLuz)
            }, 350)
        }

        function colorANumero(color) {
            switch (color) {
                case 'verde':
                    return 1 
                case 'rojo':
                    return 2
                case 'amarillo':
                    return 3
                case 'azul':
                    return 4
            }
        }

        /*los event listeners son innecesarios. reemplazar por actualizacion de variables en useRefs */
        var agregarEventos = function() {
            botonVerde.current.addEventListener('click', elegirColor)
            botonRojo.current.addEventListener('click', elegirColor)
            botonAmarillo.current.addEventListener('click', elegirColor)
            botonAzul.current.addEventListener('click', elegirColor)
            console.log('añadi los events')
        }

        var eliminarEventos = function() {
            botonVerde.current.removeEventListener('click', elegirColor)
            botonRojo.current.removeEventListener('click', elegirColor)
            botonAmarillo.current.removeEventListener('click', elegirColor)
            botonAzul.current.removeEventListener('click', elegirColor)
            console.log('elimine los events')
        }

        function ganoElJuego() {
            alert('Felicidades! Ganaste el juego')
            nivel.current = ''
            botonDeFin.current.click()
        }

        function perdioElJuego() {
            alert(`Perdiste en el nivel ${nivel.current}/10. Volvé a intentarlo`)
            eliminarEventos()
            nivel.current = ''
            botonDeFin.current.click()
        }

        function elegirColor(ev) {
            console.log(this)
            const nombreDelColor = ev.target.dataset.color;
            const numeroDelColor = colorANumero(nombreDelColor)
            iluminarApagar(numeroDelColor)

            if(numeroDelColor === secuencia[subNivel.current]) {
                subNivel.current++
                console.log(subNivel.current)
                if(subNivel.current === nivel.current) {
                    nivel.current++
                    eliminarEventos()
                    if(nivel.current === (NIVEL_MAXIMO + 1)) {
                        ganoElJuego()
                    } else {
                        setTimeout(() => iluminarSecuencia(), 1600); 
                    }
                }
            } else {
                perdioElJuego()
            }

        }

        

        function iluminarSecuencia() {
            subNivel.current = 0
            timeOuts.current = []

            for (let i = 0; i < nivel.current; i++) {
                let luz = secuencia[i];
                timeOuts.current.push(setTimeout(() => iluminarApagar(luz), 1000 * i))
            }
            console.log(timeOuts.current)

            setTimeout(() => agregarEventos(), 1000 * nivel.current)
            
        }
        
        function cancelarTimeOuts(aFinalizar) {
                clearTimeout(aFinalizar)
            }


        if (finalizar) {
            console.log(this)
            eliminarEventos()
            for (let j = 0; j < nivel.current; j++) {
                cancelarTimeOuts(timeOuts.current[j])
            }
            
            timeOuts.current = []
            nivel.current = ''
            console.log(timeOuts.current)
            console.log('se detuvo la app')
        }

        if (iniciar) {
            /* let secuencia = new Array(NIVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*4 + 1)) */
            nivel.current = 1; /*valor con propósito de pruebas*/
            console.log(secuencia)
            console.log(timeOuts.current)

            

            setTimeout(() => iluminarSecuencia(), 1000)
            
        }

        
    }, [iniciar, finalizar])


    return (
        <main className="vh-100 d-flex flex-column justify-content-around align-items-center bg-danger">
            <SimonContext.Provider value={state}>
                <BotonInicio/>
                <BotonFinalizar/>
                <div>
                    <p>{`nivel: ${nivel.current}`}</p>
                </div>
                <LucesSimon />
            </SimonContext.Provider>
        </main> 
    )
}
