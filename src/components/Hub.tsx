import React, {useState} from "react";


export const Hub = () => (
        <ul className="nav flex-column">
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/pareto">Парето</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/baseCriteria">Базовый критерий</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pointScore">Балльный критерий</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pairComparisonCriterias">Парное сравнение</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/borda">Борда</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/nanson">Нансон</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/weightedSum">Взвешенная сумма</a>
        </li>
    </ul>
)