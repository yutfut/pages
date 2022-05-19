import React from "react";

export const PairComparisonCriterias: React.FC = () => {
    return(
        <div>
            <h2>Определение весовых коэффициентов методом парного сравнения критериев</h2>

            <h3>таблица с матрицей сравнения</h3>
            {printmatrix(criteriasComparison)}

            <h3>Вывод баллов каждого критерия</h3>
            {countCriteriasPoints(criteriasComparison).toString()}

            <h3>Сумма баллов всех критериев</h3>
            {countSumPoints(countCriteriasPoints(criteriasComparison))}

            <h3>Вес одного балла</h3>
            {getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison)))}

            <h3>Итоговое значение критериев</h3>
            {countFinalPoints(countCriteriasPoints(criteriasComparison),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison))))}

        </div>
    )
}

let criteriasNum: number = 10;

let criteriasComparison: Array<Array<number>> = [   [1,	    1,	    1,	    1,	    1,	    1,	    0.5,	0.5,	1,	    1],
                                                    [0,	    1,	    0.5,	0.5,	0.5,	1,	    0,	    0,	    1,	    1],
                                                    [0,	    0.5,	1,	    0.5,	0.5,	1,	    0,	    0,	    1,	    1],
                                                    [0,	    0.5,	0.5,	1,	    0.5,	1,	    0,	    0,	    1,	    1],
                                                    [0,	    0.5,	0.5,	0.5,	1,	    1,	    0,	    0,	    1,	    1],
                                                    [0,	    0,	    0,	    0,	    0,	    1,	    0,	    0,	    0.5,	0.5],
                                                    [0.5,	1,	    1,	    1,	    1,	    1,	    1,	    0.5,	1,	    1],
                                                    [0.5,	1,	    1,	    1,	    1,	    1,	    0.5,	1,	    1,	    1],
                                                    [0,	    0,	    0,	    0,	    0,	    0.5,	0,	    0,	    1,	    0.5],
                                                    [0,	    0,	    0,	    0,	    0,	    0.5,	0,	    0,	    0.5,	1]];


function printmatrix(matrix: Array<Array<number>>) //приводим всю матрицу в строку
{
    let printedMatrix: string = "";

    for (let i = 0; i < matrix.length; i++){
        printedMatrix = printedMatrix + "\n | ";
        for (let j = 0; j < matrix[i].length; j++){
            printedMatrix = printedMatrix + matrix[i][j] + " ";
        }
    }

    return printedMatrix;
}

function countCriteriasPoints(critsComparison: Array<Array<number>>)
{
    let criteriasPoints: Array<number> = [0,0,0,0,0,0,0,0,0,0]

    for (let i = 0; i < critsComparison.length; i++)
    {
        for (let j = 0; j < critsComparison[i].length; j++)
        {
            criteriasPoints[i] = criteriasPoints[i] + critsComparison[i][j];
        }
    }

    return criteriasPoints;
}


function countSumPoints(points: Array<number>) {

    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += points[i];
    }
    return sumPoints;
}

function getPointWeight(pointSum: number)
{
    return 1 / pointSum;
}

function countFinalPoints(criteriasPoints: Array<number>, pointWeight: number) {
    let criteriasFinalPoints: Array<number> = criteriasPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = criteriasPoints[i] * pointWeight;
    }

    return  criteriasFinalPoints;
}
