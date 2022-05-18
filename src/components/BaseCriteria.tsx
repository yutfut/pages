import React from "react";

export const BaseCriteria: React.FC = () => {
    return(
        <div>
            <h2>Определение весовых коэффициентов методом базового критерия</h2>

            <h3>заполняемая таблица с флажками, отмечающая базовые критерии</h3>
            {announceBase(criteriasBase)}
            <h3>таблица, показывающая, сколько баллов весят небазовые критерии</h3>
            {printNumArray(fillPointsArray(criteriasBase))}
            <h3>вывод суммы всех баллов</h3>
            {countSumPoints(fillPointsArray(criteriasBase)).toString()}
            <h3>вывод веса базового критерия</h3>
            {pointWeight.toString()}
            <h3>вывод значений веса всех критериев</h3>
            {printNumArray(countFinalPoints(fillPointsArray(criteriasBase), pointWeight))}
        </div>
    )
}


//base criteria

let criteriasNum: number = 10;

let criteriasBase: Array<boolean> = [false, false, true, false, true ,false, false , false, true, true];


function fillPointsArray(criteriasBase: Array<boolean>) {

    let criteriasPoints: Array<number> = [0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < criteriasPoints.length; i++) {
        if (criteriasBase[i]) {
            criteriasPoints[i] = 1;
        } else {
            criteriasPoints[i] = 2;
        }
    }
    return criteriasPoints;
}

function announceBase(criteriasBase: Array<Boolean>) {
    let AnnounceMessage: String = "";

    for (let i = 0; i < criteriasBase.length; i++) {
        if (criteriasBase[i]) {
            AnnounceMessage += "Критерий " + (i + 1) + " базовый, весит 1 балл; \n";
        } else {
            AnnounceMessage +="Критерий " + (i + 1) + " небазовый, весит 2 балла; \n";
        }
    }

    return AnnounceMessage;
}

function printNumArray(numArray: Array<Number>)
{
    let printArray: String = "";
    for (let i = 0; i < numArray.length; i++)
    {
        printArray = printArray + numArray[i].toString() + " ";
    }
    return printArray;
}

function countSumPoints(points: Array<number>) {

    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += points[i];
    }
    return sumPoints;
}

let pointWeight: number = 1/countSumPoints(fillPointsArray(criteriasBase));

function countFinalPoints(criteriasPoints: Array<number>, pointWeight: number) {
    let criteriasFinalPoints: Array<number> = criteriasPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = criteriasPoints[i] * pointWeight;
    }

    return  criteriasFinalPoints;
}
