import React from "react";
import DataGrid from 'react-data-grid';
import { useState } from 'react';

export const Pareto: React.FC = () => {

    const [range, setRange] = useState('1');

    return(
        <div>
            <h2>Проверка парето-оптимальности вариантов</h2>

            <div className="accordion-body show">
                <label htmlFor="customRange" className="form-label p-3" ><strong>Показать шаги:</strong></label>
                <input type="range" className="form-range p-3"
                       style={{width: 150, verticalAlign: "middle" }}
                       min="1" max="3" step="1"
                       onChange={(e) =>
                                       {
                                           setRange(e.target.value);
                                       }
                                }
                       value = {range}
                       id="customRange"/>
                {range}
            </div>

            <div className=" accordion-body show" >
                <h3>Значения критериев для вариантов:</h3>

                {printmatrix(critsVars)}
                <div className={"text-center"} style={{ width: 500 }}>
                    <DataGrid columns={critsVarsCols} rows={critsVarsRows} />
                    {MyGrid()}
                    {printmatrix(rowsToMatrix(critsVarsRows))}
                </div>
            </div>

            <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
                <h3>Матрица сравнения вариантов:</h3>
                {printmatrix(compareVars(critsVars))}
                <div className={"text-center"} style={{ width: 500 }}>
                    <DataGrid columns={critsVarsCols} rows={createRows(compareVars(rowsToMatrix(critsVarsRows)), "Вариант")} />
                </div>
            </div>

            <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"} >
               <h3>Вывод об оптимальности вариантов:</h3>
               {printBoolArray(paretoCheck(compareVars(critsVars)))}
               {paretoCheckPrint(paretoCheck(compareVars(critsVars)))}
            </div>

        </div>
    )
}


let critsVars: Array<Array<number>> = [[3, 2, 1], [1, 2, 3], [3, 2, 3]];

const critsVarsCols = [
    { key: 'Crits', name: '' },
    { key: 'Var1', name: 'Вариант 1' },
    { key: 'Var2', name: 'Вариант 2' },
    { key: 'Var3', name: 'Вариант 3' }
];

const critsVarsRows = [
    { Crits: 'Критерий 1', Var1: critsVars[0][0], Var2: critsVars[1][0], Var3: critsVars[2][0]},
    { Crits: 'Критерий 2', Var1: critsVars[0][1], Var2: critsVars[1][1], Var3: critsVars[2][1]},
    { Crits: 'Критерий 3', Var1: critsVars[0][2], Var2: critsVars[1][2], Var3: critsVars[2][2]},
];

function MyGrid() {
    const [rows, setRows] = useState(critsVarsRows);

    return <DataGrid
        columns={critsVarsCols}
        rows={rows}
        onRowDoubleClick={(row, column) => column.editor}
        onRowsChange={setRows} />;
}

function rowsToMatrix(rows: any){
    let matrix: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    matrix[0][0] = rows[0].Var1;
    matrix[0][1] = rows[1].Var1;
    matrix[0][2] = rows[2].Var1;

    matrix[1][0] = rows[0].Var2;
    matrix[1][1] = rows[1].Var2;
    matrix[1][2] = rows[2].Var2;

    matrix[2][0] = rows[0].Var3;
    matrix[2][1] = rows[1].Var3;
    matrix[2][2] = rows[2].Var3;

    return matrix;
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

function printBoolArray(boolArray: Array<Boolean>) //приводим в строку
{
    let printArray: String = "";
    for (let i = 0; i < 3; i++)
    {
        if (boolArray[i]) {
            printArray = printArray + "1 ";
        }
        else
        {
            printArray = printArray + "0 ";
        }
    }
    return printArray;
}


function compareVars (matrix: Array<Array<number>>) {

    let varsVars: Array<Array<number>> = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]; //все единицы

    for(let i = 0; i < 3; i++) //перебираем варианты
    {
        for(let k = 0; k < 3; k++) //перебираем варианты, с которыми сравниваем
        {
            if (i == k) //если сравниваем вариант с самим собой
            {
                varsVars[i][k] = 0; //то там ноль
            }
            else //если не с самим собой, то смотрим по критериям
            {
                for (let j = 0; j < 3; j++) //перебираем критерии
                {
                    if (matrix[i][j] > matrix[k][j]) //если вариант k уступает хотя бы по одному критерию варианту i
                    {
                        varsVars[i][k] = 0; //то вариант i оптимален
                    }

                }
            }
        }
    }
    return varsVars
}



function paretoCheck (matrix: Array<Array<number>>)
{
    let result: Array<boolean> = [true,true,true]; //по умолчанию - все оптимальны

    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (matrix[i][j] == 1) //если в матрице хотя бы один элемент столбца равен единице
            {
                result[i] = false; // то столбец (вариант) неоптимален
            }
        }
    }

    return result;
}

function paretoCheckPrint (result: Array<boolean>)
{
    let resultPrint: String = "";

    for (let i = 0; i < 3; i++)
    {
        if (result[i])
        {
            resultPrint = resultPrint + "Вариант " + (i+1) + " парето-оптимален \n";
        }
        else
        {
            resultPrint = resultPrint + "Вариант " + (i+1) + " не оптимален \n";
        }
    }

    return resultPrint;
}



function createRows(matrix: Array<Array<number>>, rowName: String){

    const critsVarsRows = [
        { Crits: rowName + ' 1', Var1: matrix[0][0], Var2: matrix[1][0], Var3: matrix[2][0]},
        { Crits: rowName + ' 2', Var1: matrix[0][1], Var2: matrix[1][1], Var3: matrix[2][1]},
        { Crits: rowName + ' 3', Var1: matrix[0][2], Var2: matrix[1][2], Var3: matrix[2][2]},
    ];

    return critsVarsRows;
}