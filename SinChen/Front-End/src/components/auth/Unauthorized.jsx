import React from 'react';
import { Link } from 'react-router-dom';
import forbidden from './images/forbidden.png'

export default function ProtectedUserRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <div className="text-center">
            <img src={forbidden} className="img-fluid" alt="Forbidden png"/>
            <h1>403</h1>
            <h2>Oeps! Geen toegang</h2>
            <h3><Link to='/'>Klik hier om terug te gaan.</Link></h3>
        </div>
    )
}