import React, {useCallback, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";

export const Borda: React.FC = () => {

    const [range, setRange] = useState('1')

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '92%', height: '85%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [rowData, setRowData] = useState<any[]>(
        [   {"count": 29, "place1": "Вариант 1", "place2": "Вариант 2", "place3": "Вариант 3"},
            {"count": 0, "place1": "Вариант 1", "place2": "Вариант 3", "place3": "Вариант 2"},
            {"count": 6, "place1": "Вариант 2", "place2": "Вариант 1", "place3": "Вариант 3"},
            {"count": 17, "place1": "Вариант 2", "place2": "Вариант 3", "place3": "Вариант 1"},
            {"count": 14, "place1": "Вариант 3", "place2": "Вариант 1", "place3": "Вариант 2"},
            {"count": 14, "place1": "Вариант 3", "place2": "Вариант 2", "place3": "Вариант 1"} ]
    );

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'count', headerName: "Кол-во экспертов", editable: true, width: 240 },
        { field: 'place1', headerName: "1 место" },
        { field: 'place2', headerName: "2 место" },
        { field: 'place3', headerName: "3 место" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 200,
        };
    }, []);


    return(
        <div className="container">

            <div className="row">
                <div className="col col-3">
                    <h2>Навигация</h2>
                    <Hub/>
                </div>

                <div className="col">
            <h2>Прямой метод принятия решений процедурой Борда</h2>

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

                    <div className="p-3"></div>

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
