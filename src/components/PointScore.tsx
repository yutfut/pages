import React from "react";

export const PointScore: React.FC = () => {
    return(
        <div>
            <h1>Определение весовых коэффициентов методом бальной оценки</h1>

            <h3>таблица для ввода значений критериев</h3>
            {printNumArray(criteriasPoints)}

            <h3>вывод суммы всех баллов</h3>
            {countSumPoints(criteriasPoints).toString()}

            <h3>вывод веса одного балла критерия</h3>
            {pointWeight.toString()}

            <h3>вывод значений веса всех критериев</h3>
            {printNumArray(countFinalPoints(criteriasPoints))}

        </div>
    )
}

let criteriasNum: number = 10;

let criteriasPoints: Array<number> = [100, 75, 75, 75, 75, 50, 100, 100, 50, 50];

function printNumArray(numArray: Array<Number>)
{
    let printArray: String = "";
    for (let i = 0; i < numArray.length; i++)
    {
        printArray = printArray + numArray[i].toString() + " ";
    }
    return printArray;
}

function countSumPoints(points: Array<number>)
{
    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += points[i];
    }

    return sumPoints;
}

let pointWeight: number = 1/countSumPoints(criteriasPoints);

function countFinalPoints(critPoints: Array<number>)
{
    let sumPoints: number = 0;

    let criteriasFinalPoints: Array<number> = critPoints;

    for (let i = 0; i < critPoints.length; i++) {
        sumPoints += critPoints[i];
    }

    let pointWeight: number = 1/sumPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = critPoints[i] * pointWeight;
    }
    return  criteriasFinalPoints;
}

