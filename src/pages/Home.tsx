import React from "react";
import {Pareto} from "../components/Pareto";
import {BaseCriteria} from "../components/BaseCriteria";
import {PointScore} from "../components/PointScore";
import {PairComparisonCriterias} from "../components/PairComparisonCriterias";
import {Borda} from "../components/Borda";
import {Nanson} from "../components/Nanson";
import {WeightedSum} from "../components/WeightedSum";

export const Home = () => {
    return (
        <div>
            <h1>Текущие варианты:</h1>

            <h4>Парето-оптимальность</h4>

            <h4>Базовый критерий</h4>

            <h4>Балльный критерий</h4>

            <h4>Парное сравнение критериев</h4>

            <h4>Борда</h4>

            <h4>Нансон</h4>

            <h4>Взвешенная сумма</h4>

        </div>
    )
}