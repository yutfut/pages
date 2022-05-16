import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";


export const Navbar = () => (
    <nav className={"navbar navbar-dark navbar-expand-lg bg-dark container-fluid"}>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        className="nav-link" aria-current="page"
                        to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/theory">Теория</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/about">О приложении</NavLink>
                </li>
            </ul>
        </div>

        <div className="navbar-brand">
            МППР
        </div>

    </nav>
)