import React from "react";

export const Nanson: React.FC = () => {
    return(
        <div>
            <h1>Прямой метод принятия решений процедурой Нансона</h1>

            <h3>Таблица с мнениями экспертов для трёх вариантов</h3>
            { printExperts(expsVars, vars) }
            <h3>Матрица парного сравнения вариантов</h3>
            {printmatrix(nansonPairComparison(expsVars, vars))}
            <h3>Подсчет баллов для трех вариантов</h3>
            {printNumArray(countNansonPoints(expsVars, vars))}
            <h3>Отсеивание наименьшего варианта</h3>
            {findWorstOption(countNansonPoints(expsVars, vars))}
            <h3>Матрица парного сравнения оставшихся вариантов</h3>
            {printmatrix(reduceMatrix(nansonPairComparison(expsVars, vars), findWorstOption(countNansonPoints(expsVars, vars))))}
            <h3>Подсчет баллов для двух вариантов</h3>
            {printNumArray(countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars, vars), findWorstOption(countNansonPoints(expsVars, vars)))))}
            <h3>Отсеивание наименьшего варианта</h3>
            {findWorstOption(countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars, vars), findWorstOption(countNansonPoints(expsVars, vars)))))}
            <h3>Вывод лучшего варианта</h3>
            {"Тот который остался"}
        </div>
    )
}


let variants: number = 3;

let expertsTypes: number = 6; //факториал от количества вариантов

let vars: Array<Array<number>> = [[3, 2, 1], [3, 1, 2],[2, 3, 1], [1, 3, 2], [2,1,3], [1,2,3]]; //все возможные варианты расстановки мест

let expsVars: Array<number> = [29, 0, 6, 17, 14, 14]; //длина массива - expertsTypes, т.е. факториал от кол-ва вариантов

let result: Array<number> = [0,0,0]; //длина массива - количество вариантов


function printExperts(expsVars: Array<number>, vars: Array<Array<number>>)
{
    let ExpertsOpinion: String = "";
    for(let i = 0; i < 6; i++)
    {
        ExpertsOpinion+="\n";
        ExpertsOpinion+= expsVars[i].toString() + " экспертов считают, что  ";
        for(let j = 0; j < 3; j++)
        {
            ExpertsOpinion+= "вариант " + (j+1).toString() + " заслуживает " +  vars[i][j].toString() + " баллов;";
        }
    }
    return ExpertsOpinion;
}

function countNansonPoints (expsVars: Array<number>, vars: Array<Array<number>>) //подсчёт очков каждого варианта с целью поиска худшего
{
    let result: Array<number> = [0,0,0]; //длина массива - количество вариантов

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < result.length; j++) {
            result[j] = result[j] + expsVars[i] * vars[i][j];
        }
    }
    return result;
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

function nansonPairComparison (expsVars: Array<number>, vars: Array<Array<number>>) //создание матрицы парного сравнения вариантов
{
    let pairComparison: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    for (let k = 0; k < 6; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (vars[k][i] > vars[k][j]) {
                    pairComparison[i][j] = pairComparison[i][j] + expsVars[k];
                }
            }
        }
    }
    return pairComparison;
}

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


for(let i = 0; i < 3; i++)
{
    for(let j = 0; j < 3; j++)
    {
        result[i]=result[i]+nansonPairComparison(expsVars, vars)[i][j];
    }

}


function findWorstOption(pointArray: Array<number>)
{
    let worstOption: number = 0;

    for (let i = 0; i < pointArray.length; i++) {
        if (pointArray[i] < pointArray[worstOption]) {
            worstOption = i;
        }
    }

    return worstOption;
}


let pairComparison: Array<Array<number>> = nansonPairComparison(expsVars, vars);

function reduceMatrix(matrix: Array<Array<number>>, unwantedOption: number)
{
    let newMatrix: Array<Array<number>> = matrix;
    newMatrix.splice(unwantedOption, 1)

    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i].splice(unwantedOption, 1)
    }

    return newMatrix
}

function countMatrixPoints(matrixComparison: Array<Array<number>>)
{
    let totalPoints: Array<number> = [0,0]

    for (let i = 0; i < matrixComparison.length; i++)
    {
        for (let j = 0; j < matrixComparison[i].length; j++)
        {
            totalPoints[i] = totalPoints[i] + matrixComparison[i][j];
        }
    }
    return totalPoints;
}


result.splice(findWorstOption(result),1)
result[0] = 0;
result[1] = 0;

for(let i = 0; i < 2; i++)
{
    for(let j = 0; j < 2; j++)
    {
        result[i]=result[i]+pairComparison[i][j];
    }

}

pairComparison.splice(findWorstOption(result),1)
for(let i = 0; i < 1; i++)
{
    pairComparison[i].splice(findWorstOption(result),1)
}