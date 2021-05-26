import React, { useState, useEffect, useRef } from 'react';

import { SimonContext } from '../contexts/SimonContext';

import BotonInicio from '../Componentes/Simon_Dice/BotonInicio';
import BotonFinalizar from '../Componentes/Simon_Dice/BotonFinalizar';

import LuzVerde from '../Componentes/Simon_Dice/LuzVerde';
import LuzRoja from '../Componentes/Simon_Dice/LuzRoja';
import LuzAmarilla from '../Componentes/Simon_Dice/LuzAmarilla';
import LuzAzul from '../Componentes/Simon_Dice/LuzAzul';



export default function SimonDice() {

    const [iniciar, setIniciar] = useState(false)
    const [finalizar, setFinalizar] = useState(true)

    const [estadoLuzVerde, setEstadoLuzVerde] = useState('')
    const [estadoLuzRoja, setEstadoLuzRoja] = useState('')
    const [estadoLuzAmarilla, setEstadoLuzAmarilla] = useState('')
    const [estadoLuzAzul, setEstadoLuzAzul] = useState('')

    const [aviso, setAviso] = useState()
    
    /*referencia al boton "Finalizar el juego"*/
    const botonDeFin = useRef()

    /*Acá es donde se guarda el numero que devuelva cada luz al ser presionada*/
    const numeroDeBoton = useRef(0)

    const nivel = useRef('')

    /*Acá es en donde, posteriormente, se guardará una función con la lógica necesaria para habilitar el click sobre las luces, y decidir si el usuario pasó de nivel o no*/
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

    /*Acá se va a guardar un array con los setTimeouts que haran posible la iluminación con el ritmo apropiado. Se los guarda en un array para poder cancelarlos a gusto con clearTimeout*/
    const timeOuts = useRef([])

    /*Como la logica para presionar las luces esta dentro de un setTimeout, lo guardo acá para poder cancelar ese timeout si el usuario decide finalizar el juego*/
    const timeoutLogicaDeClick = useRef()

    const timeoutPasoDeNivel = useRef()

    const NIVEL_MAXIMO = 4


    useEffect(() => {

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

        
        /*Cuando se carga la página, el estado de finalizar es por defecto true. Entonces, esta logica se ejecutará despues del primer render, y cada vez que se haga click en el boton "Finalizar el juego"*/
        /*Se define a clickBoton.current como una función vacía para que no dispare un error en caso de que el usuario presione una luz cuando no le es permitido, es decir, cuando la logica para presionar las luces no exista*/
        if (finalizar) {
            clearTimeout(timeoutPasoDeNivel.current)
            clearTimeout(timeoutLogicaDeClick.current)
            setAviso('Presiona el boton para comenzar')
            clickBoton.current = function () {}
            timeOuts.current.forEach((item) => cancelarTimeOuts(item))
            
            timeOuts.current = []
            nivel.current = ''
            console.log('se finalizó la partida')
        }

        if (iniciar) {
            let secuencia = new Array(NIVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*4 + 1))
            nivel.current = 1
            
            console.log(secuencia)

            function iluminarSecuencia() {
                subNivel.current = 0
                timeOuts.current = []
                setAviso('Espera...')
    
                for (let i = 0; i < nivel.current; i++) {
                    let luz = secuencia[i];
                    timeOuts.current.push(setTimeout(() => iluminarApagar(luz), 1000 * i))
                }

                timeoutLogicaDeClick.current = setTimeout(() => {
                    setAviso('Ahora')
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
                                timeoutPasoDeNivel.current = setTimeout(() => iluminarSecuencia(), 1600); 
                            }
                        }
                    } else {
                        perdioElJuego()
                    }
                    }
                }, 1000 * nivel.current)

                
            }

            setTimeout(() => iluminarSecuencia(), 150)
        }

    }, [iniciar, finalizar])

    


    return (
        <main className="contenedor-app-simon">
            <SimonContext.Provider value={state}>
                <div className="contenedor-inicio-finalizar">
                    <BotonInicio/>
                    <BotonFinalizar/>
                </div>
                <div className="contenedor-nivel-aviso-luces">
                    <div>
                        <h5>{`nivel: ${nivel.current}`}</h5>
                    </div>
                    <div>
                        <h5>{aviso}</h5>
                    </div>
                    <div className="contenedor-luces">
                        <LuzVerde />
                        <LuzRoja />
                        <LuzAmarilla />
                        <LuzAzul />
                    </div>
                </div>
                
            </SimonContext.Provider>
        </main> 
    )
}
