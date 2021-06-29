import React from 'react';
import { Link } from 'react-router-dom';
import error from './images/error.png'

export default function ProtectedUserRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <div className="text-center">
            <img src={error} className="img-fluid" alt="Error png" />
            <h1>404</h1>
            <h2>Oeps! Pagina niet gevonden</h2>
            <h3><Link to='/'>Klik hier om terug te gaan.</Link></h3>
        </div>
    )
}