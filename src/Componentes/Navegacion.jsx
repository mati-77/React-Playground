import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <p className="navbar-brand mb-0">React Playground</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        <Link to="/simon" className="nav-link active">Simon Dice</Link>
                        {/* <Link to="/post" className="nav-link">Post</Link> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}
