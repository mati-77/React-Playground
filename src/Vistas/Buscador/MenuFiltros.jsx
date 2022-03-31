import React from 'react';

export default function MenuFiltros ({ mostrarMenu, animacionMostrarMenu, animacionOcultarMenu, desplegarMenuFiltros, seleccBoton }) {
    return(
       <div className={`menu-filtros ${mostrarMenu} ${animacionMostrarMenu} ${animacionOcultarMenu}`} onClick={desplegarMenuFiltros}>
            <div className="caja-filtros">
                <p className="fw-bold">Status</p>
                <div className="opciones-filtros">
                    <button type="button" id="vivo" data-tipo="status" data-filtro="Alive" onClick={seleccBoton}>Vivo</button>
                    <button type="button" id="muerto" data-tipo="status" data-filtro="Dead" onClick={seleccBoton}>Muerto</button>
                    <button type="button" id="desconocido-1" data-tipo="status" data-filtro="unknown" onClick={seleccBoton}>Desconocido</button>
                </div>
            </div>
            <div className="caja-filtros">
                <p className="fw-bold">Especie</p>
                <div className="opciones-filtros">
                    <button type="button" id="humana" data-tipo="species" data-filtro="Human" onClick={seleccBoton}>Humana</button>
                    <button type="button" id="alien" data-tipo="species" data-filtro="Alien" onClick={seleccBoton}>Alien</button>
                </div>
            </div>
            <div className="caja-filtros">
                <p className="fw-bold">Género</p>
                <div className="opciones-filtros">
                    <button type="button" id="masculino" data-tipo="gender" data-filtro="Male" onClick={seleccBoton}>Masculino</button>
                    <button type="button" id="femenino" data-tipo="gender" data-filtro="Female" onClick={seleccBoton}>Femenino</button>
                    <button type="button" id="desconocido-2" data-tipo="gender" data-filtro="unknown" onClick={seleccBoton}>Desconocido</button>
                </div>
            </div>
        </div> 
    )
    
}