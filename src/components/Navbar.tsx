import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Главная</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href={"/Theory"}>Теория</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href={"/About"}>О приложении</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)

    /*

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

</nav>

*/