import React, { useState, useEffect, useRef } from 'react';

import { SimonContext } from '../../contexts/SimonContext';

import BotonInicio from './BotonInicio';
import BotonFinalizar from './BotonFinalizar';

import Luz from './Luz';

import './simon.css'



export default function SimonDice() {

    const [iniciar, setIniciar] = useState(false)
    const [finalizar, setFinalizar] = useState(true)

    const [estadoLuzVerde, setEstadoLuzVerde] = useState('')
    const [estadoLuzRoja, setEstadoLuzRoja] = useState('')
    const [estadoLuzAmarilla, setEstadoLuzAmarilla] = useState('')
    const [estadoLuzAzul, setEstadoLuzAzul] = useState('')

    const [avisoAlUsuario, setAvisoAlUsuario] = useState()
    
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

    const NIVEL_MAXIMO = 10


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
                default:
                    return null
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
                default:
                    return null
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
            setAvisoAlUsuario('Presiona el botón para comenzar')
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
                setAvisoAlUsuario('Espera...')
    
                for (let i = 0; i < nivel.current; i++) {
                    let luz = secuencia[i];
                    timeOuts.current.push(setTimeout(() => iluminarApagar(luz), 1000 * i))
                }

                timeoutLogicaDeClick.current = setTimeout(() => {
                    setAvisoAlUsuario('Ahora')
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
                        <h5 className="aviso">{`nivel: ${nivel.current}`}</h5>
                    </div>
                    <div>
                        <h5 className="aviso">{avisoAlUsuario}</h5>
                    </div>
                    <div className="contenedor-luces">
                        <Luz clasesLuz={`luz-verde ${estadoLuzVerde}`} dataColor="verde" numColor={1}/>
                        <Luz clasesLuz={`luz-roja ${estadoLuzRoja}`} dataColor="rojo" numColor={2}/>
                        <Luz clasesLuz={`luz-amarilla ${estadoLuzAmarilla}`} dataColor="amarillo" numColor={3}/>
                        <Luz clasesLuz={`luz-azul ${estadoLuzAzul}`} dataColor="azul" numColor={4}/>
                    </div>
                </div>
            </SimonContext.Provider>
        </main> 
    )
}
