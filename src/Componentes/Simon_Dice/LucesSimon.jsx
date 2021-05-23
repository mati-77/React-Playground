import React from 'react';
import LuzRoja from './LuzRoja';
import LuzVerde from './LuzVerde';
import LuzAmarilla from './LuzAmarilla';
import LuzAzul from './LuzAzul';

export default function LucesSimon() {
    return (
        <div className="contenedor-luces">
            <LuzVerde />
            <LuzRoja />
            <LuzAmarilla />
            <LuzAzul />
        </div>
    )
}