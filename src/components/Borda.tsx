import React, {useState} from "react";

export const Borda: React.FC = () => {

    const [range, setRange] = useState('1')

    return(
        <div>
            <h1>Прямой метод принятия решений процедурой Борда</h1>

            <div className="border-danger">
                <label htmlFor="customRange" className="form-label p-3" >Показать шаги:</label>
                <input type="range" className="form-range p-3"
                       style={{width: 150, verticalAlign: "middle" }}
                       min="1" max="4" step="1"
                       onChange={(e) =>
                       {
                           setRange(e.target.value);
                       }
                       }
                       value = {range}
                       id="customRange"/>
                {range}
            </div>

            <h3>Таблица для подсчёта мнений экспертов</h3>
            { printExperts(expsVars, vars) }

            <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Матрица парного сравнения вариантов</h3>
            {printmatrix(bordaPairComparison(vars, expsVars))}
            </div>

            <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Таблица со значение подсчётов Yj (баллов для каждого варианта)</h3>
            {printNumArray(countBordaPoints(expsVars, vars))}
            </div>

            <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Вывод номера лучшего варианта</h3>
            {findBestOption(countBordaPoints(expsVars, vars))}
            </div>
        </div>
    )
}

let variants: number = 3; //количество вариантов

let expertsTypes: number = 6; //факториал от количества вариантов

let vars: Array<Array<number>> = [[3, 2, 1], [3, 1, 2],[2, 3, 1], [1, 3, 2], [2,1,3], [1,2,3]]; //все возможные варианты расстановки мест

let expsVars: Array<number> = [29, 0, 6, 17, 14, 14]; //длина массива - expertsTypes, т.е. факториал от кол-ва вариантов


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

function bordaPairComparison (vars: Array<Array<number>>, expsVars: Array<number>)
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

function countBordaPoints (expsVars: Array<number>, vars: Array<Array<number>>)
{
    let result: Array<number> = [0,0,0]; //длина массива - количество вариантов

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
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

function findBestOption(pointArray: Array<number>) {
    let bestOption: number = 0;

    for (let i = 0; i < pointArray.length; i++) {
        if (pointArray[i] > pointArray[bestOption]) {
            bestOption = i;
        }
    }

    return bestOption;
}