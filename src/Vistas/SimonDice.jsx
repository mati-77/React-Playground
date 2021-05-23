import React, { useState, useEffect, useRef } from 'react';

import { SimonContext } from '../contexts/SimonContext';

import BotonInicio from '../Componentes/Simon_Dice/BotonInicio';
import BotonFinalizar from '../Componentes/Simon_Dice/BotonFinalizar';
import LucesSimon from '../Componentes/Simon_Dice/LucesSimon';



export default function SimonDice() {

    const [iniciar, setIniciar] = useState(false)
    const [finalizar, setFinalizar] = useState(true)

    const [estadoLuzVerde, setEstadoLuzVerde] = useState('')
    const [estadoLuzRoja, setEstadoLuzRoja] = useState('')
    const [estadoLuzAmarilla, setEstadoLuzAmarilla] = useState('')
    const [estadoLuzAzul, setEstadoLuzAzul] = useState('')
    

    const botonDeFin = useRef()

    const numeroDeBoton = useRef(0)

    const nivel = useRef('')

    const clickBoton = useRef()

    const state = {
        iniciar, setIniciar, 
        finalizar, setFinalizar, 
        estadoLuzVerde, setEstadoLuzVerde, 
        estadoLuzRoja, setEstadoLuzRoja, 
        estadoLuzAmarilla, setEstadoLuzAmarilla, 
        estadoLuzAzul, setEstadoLuzAzul, 
        botonDeFin, 
        nivel, 
        numeroDeBoton, 
        clickBoton
    }

    
    const subNivel = useRef()

    const timeOuts = useRef([])

    const NIVEL_MAXIMO = 3


    useEffect(() => {

        clickBoton.current = function () {}

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
            }, 300)
        }

        function ganoElJuego() {
            alert('Felicidades! Ganaste el juego')
            nivel.current = ''
            botonDeFin.current.click()
        }

        function perdioElJuego() {
            alert(`Perdiste en el nivel ${nivel.current}/10. Volvé a intentarlo`)
            nivel.current = ''
            botonDeFin.current.click()
        }

        function cancelarTimeOuts(aFinalizar) {
                clearTimeout(aFinalizar)
        }

        

        if (finalizar) {
            clickBoton.current = function () {}
            timeOuts.current.forEach((item) => cancelarTimeOuts(item))
            
            timeOuts.current = []
            nivel.current = ''
            console.log('se detuvo la app')
        }

        if (iniciar) {
            let secuencia = new Array(NIVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*4 + 1))
            nivel.current = 1
            console.log(secuencia)
            /* console.log(timeOuts.current) */

            function iluminarSecuencia() {
                subNivel.current = 0
                timeOuts.current = []

    
                for (var i = 0; i < nivel.current; i++) {
                    let luz = secuencia[i];
                    timeOuts.current.push(setTimeout(() => iluminarApagar(luz), 1000 * i))
                }

                setTimeout(() => {
                    clickBoton.current = function () {
                    const numeroDelColor = numeroDeBoton.current
                    iluminarApagar(numeroDelColor)

                    if(numeroDelColor === secuencia[subNivel.current]) {
                        subNivel.current++
                        if(subNivel.current === nivel.current) {
                            nivel.current++
                            if(nivel.current === (NIVEL_MAXIMO + 1)) {
                                ganoElJuego()
                            } else {
                                clickBoton.current = function () {}
                                setTimeout(() => iluminarSecuencia(), 1600); 
                            }
                        }
                    } else {
                        perdioElJuego()
                    }
                    }
                }, 1000 * nivel.current)

            }


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
