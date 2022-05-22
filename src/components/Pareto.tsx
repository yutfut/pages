'use strict';

import React, { useState, useCallback, useMemo, useRef} from "react";
import DataGrid from 'react-data-grid';
import {Hub} from "./Hub";
//import {Step1, getRows} from "./Step1"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
    ValueGetterParams
} from 'ag-grid-community';



export const Pareto: React.FC = () => {

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '85%', height: '60%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [rowData, setRowData] = useState<any[]>(
        [  {"crits":"Критерий 1", "var1": 0,"var2": 0, "var3": 0},
            {"crits":"Критерий 2", "var1": 0,"var2": 0, "var3": 0},
            {"crits":"Критерий 3", "var1": 0,"var2": 0, "var3": 0}]
    );

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crits', headerName: "Критерии" },
        { field: 'var1', headerName: "Вариант 1" },
        { field: 'var2', headerName: "Вариант 2" },
        { field: 'var3', headerName: "Вариант 3" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
        };
    }, []);

    function getRows(){

        let matrix: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

        for (let i = 0; i<3; i++) {
            matrix[0][i] = rowData[i].var1;
            matrix[1][i] = rowData[i].var2;
            matrix[2][i] = rowData[i].var3;
        }

        return matrix;
    }

    const [range, setRange] = useState('1');

    function MyGrid() {
        const [rows, setRows] = useState(critsVarsRows);

        return <DataGrid columns={critsVarsCols}
                         rows={rows}
            //rowKeyGetter={rowKeyGetter}
                         onRowsChange={setRows}
        />;
    }

    return(
        <div className="container">

            <div className="row">
            <div className="col col-3">
                <h2>Навигация</h2>
                <Hub/>
            </div>

            <div className="col">
            <h2>Проверка парето-оптимальности вариантов</h2>

            <div className="alert alert-dark " >
                <label htmlFor="customRange" className="form-label p-1" ><strong>Показать шаги:</strong></label>
                <input type="range" className="form-range p-4 "
                       style={{width: 150, verticalAlign: "middle"}}
                       min="1" max="3" step="1"
                       onChange={(e) =>
                                       {
                                           setRange(e.target.value);
                                       }
                                }
                       value = {range}
                       id="customRange"/>
                <strong>{range}</strong>
            </div>

            <div className="show" >
                <h3>Значения критериев для вариантов:</h3>


                <div className={"text-center"} style={{ width: 500 }}>
                    {printmatrix(critsVars)}
                </div>
            </div>

                <div style={containerStyle}>

                    <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                        ></AgGridReact>
                    </div>
                    <button className="btn btn-primary p-1"
                            onClick={onBtExport}
                    >
                        Export to Excel
                    </button>

                </div>

                <div className="p-5">
                    {printmatrix(getRows())}
                </div>

            <div className={(range >= "2") ? " show" : " collapse"}>
                <h3>Матрица сравнения вариантов:</h3>
                {printmatrix(compareVars(getRows()))}
                <div className={"text-center"} style={{ width: 500 }}>
                    <DataGrid
                        columns={critsVarsCols}
                        rows={createRows(compareVars(getRows()), "Вариант")}
                    />
                </div>
            </div>

            <div className={(range >= "3") ? " show" : " collapse"} >
               <h3>Вывод об оптимальности вариантов:</h3>
               {printBoolArray(paretoCheck(compareVars(getRows())))}
               {paretoCheckPrint(paretoCheck(compareVars(getRows())))}
            </div>




            </div>
            </div>
        </div>
    )
}

let critsVars: Array<Array<number>> = [[3, 2, 1], [1, 2, 3], [3, 2, 3]];

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
            if (matrix[i][j] === 1) //если в матрице хотя бы один элемент столбца равен единице
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

    const newRows = [
        { Crits: rowName + ' 1', Var1: matrix[0][0], Var2: matrix[1][0], Var3: matrix[2][0]},
        { Crits: rowName + ' 2', Var1: matrix[0][1], Var2: matrix[1][1], Var3: matrix[2][1]},
        { Crits: rowName + ' 3', Var1: matrix[0][2], Var2: matrix[1][2], Var3: matrix[2][2]},
    ];

    return newRows;
}
