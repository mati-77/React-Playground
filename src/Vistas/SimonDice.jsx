import React, { useState } from 'react';

import { SimonContext } from '../contexts/SimonContext';

import BotonInicio from '../Componentes/Simon_Dice/BotonInicio';
import BotonFinalizar from '../Componentes/Simon_Dice/BotonFinalizar';
import NivelSimon from '../Componentes/Simon_Dice/NivelSimon';
import LucesSimon from '../Componentes/Simon_Dice/LucesSimon';




export default function SimonDice() {

    const [encendido, setEncendido] = useState(false)
    const [finalizar, setFinalizar] = useState(true)
    const state = {encendido, setEncendido, finalizar, setFinalizar}


    return (
        <main className="vh-100 d-flex flex-column justify-content-around align-items-center bg-danger">
            <SimonContext.Provider value={state}>
                <BotonInicio/>
                <BotonFinalizar/>
                <NivelSimon />
                <LucesSimon />
            </SimonContext.Provider>
        </main> 
    )
}
