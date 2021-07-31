import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar(props) {

    return (
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <a class="navbar-brand">Welkom, {props.username}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between align-items-center w-100" id="navbarToggler" style={{ visibility: "visible" }}>
                {props.admin ? <ul class="navbar-nav">
                    <li class="nav-item ">
                        <Link to="/table" class="nav-link">Bestel</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/orders" class="nav-link">Bestellingen</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/meals" class="nav-link">Gerechten</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/users" class="nav-link">Gebruikers</Link>
                    </li>
                </ul>
                    : <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/table" class="nav-link">Bestel</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/orders" class="nav-link">Bestellingen</Link>
                        </li>
                    </ul>}
                <ul class="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
                    <li class="nav-item">
                        <Link to="/logout" class="nav-link">Log uit</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
