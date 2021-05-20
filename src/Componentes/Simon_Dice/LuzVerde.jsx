import React, { useContext } from 'react';
import { SimonContext } from '../../contexts/SimonContext';

export default function LuzVerde() {

    const {estadoLuzVerde} = useContext(SimonContext)

    let clasesLuzVerde = `luz-verde ${estadoLuzVerde}`

    return (
        <div id="verde" className={clasesLuzVerde}></div>
    )
}
