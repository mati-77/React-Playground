import React from 'react';

export default function ({ filtrarPorBusqueda, desplegarMenuFiltros }) {
    return(
        <nav className="barra-busqueda">
            <input type="text" placeholder="Nombre..." className="buscar-por-nombre" onChange={filtrarPorBusqueda}/>
            <button className="boton-filtros" onClick={desplegarMenuFiltros}>Filtros</button>
        </nav>
    )
}
