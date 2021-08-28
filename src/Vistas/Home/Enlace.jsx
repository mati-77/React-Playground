

export default function Enlace( {imagen, url, alt, texto} ) {
    return(
        <a className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-light" href={url} target="_blank" rel="noreferrer">
            <img src={imagen} alt={alt} style={{height: "2rem"}}/>
            <h5>{texto}</h5>
        </a>
    )
}