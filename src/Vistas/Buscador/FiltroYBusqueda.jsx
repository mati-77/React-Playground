import React from 'react';

export default function ({ consulta, filtrarPorBusqueda, desplegarMenuFiltros }) {
    return(
        <nav className="d-flex justify-content-evenly filtrar" style={{marginBottom : "1.7rem"}}>
            <input type="text" placeholder="Nombre..." ref={consulta} onChange={filtrarPorBusqueda} style={{borderRadius : "1rem", borderStyle : "none", paddingLeft : "1rem", paddingRight : "1rem", fontSize : "1.3rem", outline : "none"}}/>
            <button className="boton-filtros" onClick={desplegarMenuFiltros}>Filtros</button>
        </nav>
    )
}
