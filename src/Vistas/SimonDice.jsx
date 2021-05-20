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

   

    /* function iluminarApagar(luz) {
        luz()
        setTimeout(() => {
            luz('')
        }, 350);
    }

    function iluminarSecuencia() {
        for (let i = 0; i < nivel; i++) {
            let luz = numeroAColor(secuencia[i]);
            setTimeout(() => iluminarApagar(luz), 1000 * i)
        }
    } */


    

    const nivel = useRef('')

    
    useEffect(() => {
        
        let secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4 + 1))

        if (iniciar) {
            nivel.current = 4
            console.log(secuencia)
            console.log(nivel.current)
            iluminarSecuencia()

            /* function numeroAColor(numero) {
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
            } */

            let estadosLucesIlum = {
                1: setEstadoLuzVerde('verde-iluminada'),
                2: setEstadoLuzRoja('roja-iluminada'),
                3: setEstadoLuzAmarilla('amarilla-iluminada'),
                4: setEstadoLuzAzul('azul-iluminada')
            }

            let estadosLucesApag = {
                1: setEstadoLuzVerde(''),
                2: setEstadoLuzRoja(''),
                3: setEstadoLuzAmarilla(''),
                4: setEstadoLuzAzul('')
            }

            function iluminarApagar(numeroLuz) {
                
                /* estadosLucesIlum[numeroLuz]
                setTimeout(() => {
                    estadosLucesApag[numeroLuz]
                }, 350) */
            }
        
            function iluminarSecuencia() {
                console.log('hola hola')
                console.log(nivel.current)
                for (let i = 0; i < nivel.current; i++) {
                    let luz = secuencia[i];
                    setTimeout(() => iluminarApagar(luz.toString()), 1000 * i)
                }
            }


            

        
        }
    }, [iniciar])


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
