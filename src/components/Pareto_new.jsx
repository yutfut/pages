import React from "react";
import DataGrid from 'react-data-grid';
import ReactDOM from "react-dom";
import { useState } from 'react';
import ReactDataGrid from "react-data-grid";

export const Pareto_New = () => {

    const [range, setRange] = useState('1');

    return(
        <div>
            <h2>Проверка парето-оптимальности вариантов</h2>

            <div>
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

            <div>
                <h3>Значения критериев для вариантов:</h3>

                {printmatrix(critsVars)}
                <div className={"text-center"} style={{ width: 500 }}>
                    <DataGrid columns={critsVarsCols} rows={critsVarsRows} />
                    {MyGrid()}
                    {printmatrix(rowsToMatrix(critsVarsRows))}
                    {ReactDOM.render(<DataGrid />, rootElement)}
                </div>
            </div>

            <div className={(range >= "2") ? " show" : " collapse"}>
                <h3>Матрица сравнения вариантов:</h3>
                {printmatrix(compareVars(critsVars))}
                <div className={"text-center"} style={{ width: 500 }}>
                    <DataGrid columns={critsVarsCols} rows={createRows(compareVars(rowsToMatrix(critsVarsRows)), "Вариант")} />
                </div>
            </div>

            <div className={(range >= "3") ? " show" : " collapse"} >
                <h3>Вывод об оптимальности вариантов:</h3>
                {printBoolArray(paretoCheck(compareVars(critsVars)))}
                {paretoCheckPrint(paretoCheck(compareVars(critsVars)))}
            </div>
        </div>
    )

    const rootElement = document.getElementById("root");
}


let critsVars = [[3, 2, 1], [1, 2, 3], [3, 2, 3]];

const critsVarsCols = [
    { key: 'Crits', name: '' },
    { key: 'Var1', name: 'Вариант 1', editable: true},
    { key: 'Var2', name: 'Вариант 2', editable: true},
    { key: 'Var3', name: 'Вариант 3', editable: true}
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
        rows={setRows}
    />
}

class EditableGrid extends React.Component {
    state = { critsVarsCols };

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };
    render() {
        return (
            <ReactDataGrid
                columns={critsVarsCols}
                rowGetter={i => this.state.rows[i]}
                rowsCount={3}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
            />
        );
    }
}


function rowsToMatrix(rows){

    let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (let i= 0; i< rows.length; i++) {
        matrix[0][i] = rows[i].Var1;
        matrix[1][i] = rows[i].Var2;
        matrix[2][i] = rows[i].Var3;
    }

    return matrix;
}

function printmatrix(matrix) //приводим всю матрицу в строку
{
    let printedMatrix = "";

    for (let i = 0; i < matrix.length; i++){
        printedMatrix = printedMatrix + "\n | ";
        for (let j = 0; j < matrix[i].length; j++){
            printedMatrix = printedMatrix + matrix[i][j] + " ";
        }
    }

    return printedMatrix;
}

function printBoolArray(boolArray) //приводим в строку
{
    let printArray;
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

function compareVars (matrix)
{

    let varsVars = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]; //все единицы

    for(let i = 0; i < 3; i++) //перебираем варианты
    {
        for(let k = 0; k < 3; k++) //перебираем варианты, с которыми сравниваем
        {
            if (i == k) {//если сравниваем вариант с самим собой
                varsVars[i][k] = 0; //то там ноль
            }
            else //если не с самим собой, то смотрим по критериям
            {
                for (let j = 0; j < 3; j++) {               //перебираем критерии
                    if (matrix[i][j] > matrix[k][j]) {      //если вариант k уступает хотя бы по одному критерию варианту i
                        varsVars[i][k] = 0;                 //то вариант i оптимален
                    }
                }
            }
        }
    }
    return varsVars
}

function paretoCheck (matrix)
{
    let result = [true,true,true]; //по умолчанию - все оптимальны

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

function paretoCheckPrint (result)
{
    let resultPrint = "";

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

function createRows(matrix, rowName){

    const critsVarsRows = [
        { Crits: rowName + ' 1', Var1: matrix[0][0], Var2: matrix[1][0], Var3: matrix[2][0]},
        { Crits: rowName + ' 2', Var1: matrix[0][1], Var2: matrix[1][1], Var3: matrix[2][1]},
        { Crits: rowName + ' 3', Var1: matrix[0][2], Var2: matrix[1][2], Var3: matrix[2][2]},
    ];

    return critsVarsRows;
}

const rootElement = document.getElementById("root");
//ReactDOM.render(<Pareto_New />, rootElement);