import React from "react";

import {Pareto} from "../components/Pareto";
import {BaseCriteria} from "../components/BaseCriteria";
import {PointScore} from "../components/PointScore";
import {PairComparisonCriterias} from "../components/PairComparisonCriterias";
import {Borda} from "../components/Borda";
import {Nanson} from "../components/Nanson";
import {WeightedSum} from "../components/WeightedSum";

import {Hub} from "../components/Hub";

export const Home = () => {
    return (
        <div>
            <h2>Методы поддержки принятия решений</h2>
            <Hub/>

        </div>
    )
}