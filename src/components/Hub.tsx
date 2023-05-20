import React from "react";
import { NavLink } from 'react-router-dom';

export const Hub = ( ) => (

    <ul className="nav flex-column alert alert-primary" style={{maxWidth: "38rem"}}>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/pages/pareto">Парето</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pages/baseCriteria">Базовый критерий</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pages/pointScore">Балльный критерий</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pages/pairComparisonCriteria">Парное сравнение</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pages/borda">Борда</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pages/nanson">Нансон</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pages/weightedSum">Взвешенная сумма</a>
        </li>
    </ul>



)

/*

export const Hub = ( ) => (
            <ul className="nav flex-column">
            <NavLink to="/pareto" end >
                Парето
            </NavLink>
            <NavLink to="/baseCriteria" end >
                Базовый критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            </ul>
)

 */