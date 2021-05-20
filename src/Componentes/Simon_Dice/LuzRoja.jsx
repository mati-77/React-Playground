import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function LuzRoja() {

    const {estadoLuzRoja} = useContext(SimonContext)

    let clasesLuzRoja = `luz-roja ${estadoLuzRoja}`

    return (
        <div id="roja" className={clasesLuzRoja}></div>
    )
}