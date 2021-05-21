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
    

    /* const [nivel, setNivel] = useState('') */

    const state = {iniciar, setIniciar, finalizar, setFinalizar, estadoLuzVerde, setEstadoLuzVerde, estadoLuzRoja, setEstadoLuzRoja, estadoLuzAmarilla, setEstadoLuzAmarilla, estadoLuzAzul, setEstadoLuzAzul}

    

    const nivel = useRef('')

    const timeOuts = useRef([])

    const NIVEL_MAXIMO = 10

    
    useEffect(() => {

        
        
        

        if(finalizar) {
            function cancelarTimeOuts(otro) {
                let cosa = otro()
                console.log(cosa)
                clearTimeout(cosa)
            }


            for (let j = 0; j < nivel.current; j++) {
                /* let aCancelar = timeOuts.current[j] */
                cancelarTimeOuts(timeOuts.current[j])
                /* clearTimeout(aCancelar) */
            }
            timeOuts.current = []
            console.log(timeOuts.current)
        }

        if (iniciar) {
            let secuencia = new Array(NIVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*4 + 1))
            nivel.current = 4; /*valor con propósito de pruebas*/
            console.log(secuencia)
            /* llenarArray() */
            console.log(timeOuts.current)
            iluminarSecuencia()
            iluminarSecuencia2()

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

            function iniciarTimeOuts(aIniciar) {
               aIniciar()
               
            } 

            

            /* function llenarArray(recibida) {
                let arrayMap = recibida.map((elemento, posicion) => {
                    elemento = setTimeout(() => iluminarApagar(elemento), 1000 * posicion)
                    return elemento
                })
                return arrayMap
            } */
            

        
            function iluminarSecuencia() {
                for (let i = 0; i < nivel.current; i++) {
                    let luz = secuencia[i];
                    timeOuts.current.push(function () { return(setTimeout(() => iluminarApagar(luz), 1000 * i)) })
                    /* timeOuts.current.push(setTimeout(() => iluminarApagar(luz), 1000 * i)) */
                    /* clearTimeout(timeOuts.current[i]) */
                    /* console.log(timeOuts.current) */
                    /* timeOuts.current[i]() */ /*funciona! */
                    /* iniciarTimeOuts(timeOuts.current[i]) */ /*volver a activar si funciona*/
                }
                console.log(timeOuts.current)

                /* timeOuts.current = [] */ /*reiniciar el array aca hace que no se pueda detener el juego con el boton de finalizar*/

            }

            function iluminarSecuencia2() {
                for (let x = 0; x < nivel.current; x++) {
                    iniciarTimeOuts(timeOuts.current[x])
                    /* timeOuts.current[x] */
                    
                }
                console.log('ilum sec 2')
            }

            
        }
    }, [iniciar, finalizar])


    return (
        <main className="vh-100 d-flex flex-column justify-content-around align-items-center bg-danger">
            <SimonContext.Provider value={state}>
                <BotonInicio/>
                <BotonFinalizar/>
                {/* <div className="visible">
                    <p>{`nivel: ${nivel.current}`}</p>
                </div> */}
                <LucesSimon />
            </SimonContext.Provider>
        </main> 
    )
}
