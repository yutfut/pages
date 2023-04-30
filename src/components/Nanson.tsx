import React, {useCallback, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";

export const Nanson: React.FC = () => {

    const [range, setRange] = useState('1');

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '92%', height: '95%' }), []);
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


    const [variants, setVariants] = useState([1, 1, 1]);


    const [columnDefsStepTwo, setColumnDefsStepTwo] = useState<ColDef[]>([
        { field: 'varName', headerName: "Вариант"},
        { field: 'comparison1', headerName: "Вариант 1" },
        { field: 'comparison2', headerName: "Вариант 2" },
        { field: 'comparison3', headerName: "Вариант 3" }
    ]);

    const [rowDataStepTwo, setRowDataStepTwo] = useState<any[]>(
        [
            {   "varName": "Вариант 1",
                "comparison1": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[0][0],
                "comparison2": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[0][1],
                "comparison3": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[0][2]},
            {   "varName": "Вариант 2",
                "comparison1": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[1][0],
                "comparison2": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[1][1],
                "comparison3": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[1][2]},
            {   "varName": "Вариант 3",
                "comparison1": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[2][0],
                "comparison2": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[2][1],
                "comparison3": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[2][2]},
            ]
    );

    function expsVars() {
        let expsVars: Array<number> = [29, 0, 6, 17, 14, 14]; //длина массива - expertsTypes, т.е. факториал от кол-ва вариантов
        for (let i = 0; i<6; i++) {
            expsVars[i] = rowData[i].count;
        }
        return expsVars
    }

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'count', headerName: "Кол-во экспертов", editable: true, width: 240 },
        { field: 'place1', headerName: "1 место" },
        { field: 'place2', headerName: "2 место" },
        { field: 'place3', headerName: "3 место" },
    ]);

    const columns = [{key: 'vars', name: 'Вариант сравнения'},
        {key: 'var1', name: 'Вариант 1'},
        {key: 'var2', name: 'Вариант 2'},
        {key: 'var3', name: 'Вариант 3'}]

    const rows = [
        {'vars': 'Вариант 1', 'var1': nansonPairComparison(expsVars(), vars)[0][0],
         'var2': nansonPairComparison(expsVars(), vars)[0][1],
         'var3': nansonPairComparison(expsVars(), vars)[0][2]},
        {'vars': 'Вариант 2', 'var1': nansonPairComparison(expsVars(), vars)[1][0],
            'var2': nansonPairComparison(expsVars(), vars)[1][1],
            'var3': nansonPairComparison(expsVars(), vars)[1][2]},
        {'vars': 'Вариант 3', 'var1': nansonPairComparison(expsVars(), vars)[2][0],
            'var2': nansonPairComparison(expsVars(), vars)[2][1],
            'var3': nansonPairComparison(expsVars(), vars)[2][2]}]

    const columns2 = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" },
    ];

    const rows2 = [
        {   'crit1': countMatrixPoints((nansonPairComparison(expsVars(), vars)))[0],
            'crit2': countMatrixPoints((nansonPairComparison(expsVars(), vars)))[1],
            'crit3': countMatrixPoints((nansonPairComparison(expsVars(), vars)))[2]}
    ];

    const columns3 = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" }
    ];

    const rows3 = [
        {   'crit1': countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars))))[0],
            'crit2': countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars))))[1],
            'crit3': countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars))))[2]}
    ];


    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            result[i]=result[i]+nansonPairComparison(expsVars(), vars)[i][j];
        }

    }

    //сделать все столбцы шириной 200
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 200,
        };
    }, []);


    return(
        <div className="Base">
            <div>
                <h2>Прямой метод принятия решений процедурой Нансона</h2>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="8" step="1"
                               onChange={(e) =>
                               {
                                   setRange(e.target.value);
                               }
                               }
                               value = {range}
                               id="customRange"/>
                        <strong>{range}</strong>
                    </div>

                    <div className="input-group mb-3 col p-1">
                        <span className="input-group-text">Название: </span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <button type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>Таблица с мнениями экспертов для трёх вариантов</h3>

                <div style={{height: "318px"}}>
                    <div style={containerStyle}>
                        <div style={gridStyle} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Матрица парного сравнения вариантов</h3>
                        <DataGrid columns={columns} rows={rows}/>
                    </div>

                    <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Подсчет баллов для трех вариантов</h3>
                        <DataGrid columns={columns2} rows={rows2}/>
                    </div>

                    <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Отсеивание наименьшего варианта</h3>
                        {"Худший вариант: " + (findWorstOption(countMatrixPoints((nansonPairComparison(expsVars(), vars)))) + 1)}
                    </div>

                    <div className={(range >= "5") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Матрица парного сравнения оставшихся вариантов</h3>
                        <div style={{height: "186px"}}>
                            <div style={containerStyle}>

                                <div style={gridStyle} className="ag-theme-alpine">
                                    <AgGridReact
                                        ref={gridRef}
                                        rowData={rowDataStepTwo}
                                        columnDefs={columnDefsStepTwo}
                                        defaultColDef={defaultColDef}
                                    ></AgGridReact>
                                </div>
                            </div>
                        </div>

                        <div className={(range >= "6") ? "accordion-body show" : "accordion-body collapse"}>
                            <h3>Подсчет баллов для двух вариантов</h3>
                            <DataGrid columns={columns3} rows={rows3}/>
                        </div>
                    </div>

                    <div className={(range >= "7") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Отсеивание наименьшего варианта</h3>
                        {"Худший вариант: " + (findWorstOption(countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars),
                            findWorstOption(countNansonPoints(expsVars(), vars))))) + 1)}
                    </div>

                    <div className={(range >= "8") ? "accordion-body show" : "accordion-body collapse"}>
                            <h3>Вывод лучшего варианта</h3>
                            {"Победивший вариант - "}
                            {findLastOption
                            (   findWorstOption(countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars),
                                    findWorstOption(countNansonPoints(expsVars(), vars))))),
                                findWorstOption(countMatrixPoints((nansonPairComparison(expsVars(), vars))))  )
                                + 1}
                    </div>
                </div>
            </div>
        </div>
    )
}


let vars: Array<Array<number>> = [[3, 2, 1], [3, 1, 2],[2, 3, 1], [1, 3, 2], [2,1,3], [1,2,3]]; //все возможные варианты расстановки мест

let result: Array<number> = [0,0,0]; //длина массива - количество вариантов


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


function findWorstOption(pointArray: Array<number>)
{
    let worstOption: number = 0;

    for (let i = 0; i < pointArray.length; i++) {
        if (pointArray[i] < pointArray[worstOption] && pointArray[i] != 0) {
            worstOption = i;
        }
    }

    return worstOption;
}


function reduceMatrixWithSplice(matrix: Array<Array<number>>, unwantedOption: number)
{
    let newMatrix: Array<Array<number>> = matrix;
    newMatrix.splice(unwantedOption, 1)

    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i].splice(unwantedOption, 1)
    }

    return newMatrix
}

function reduceMatrix(matrix: Array<Array<number>>, unwantedOption: number)
{
    let newMatrix: Array<Array<number>> = matrix;

    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i][unwantedOption] = 0;
        newMatrix[unwantedOption][i] = 0;
    }

    return newMatrix
}


function countMatrixPoints(matrixComparison: Array<Array<number>>)
{
    let totalPoints: Array<number> = [];

    for (let i = 0; i < matrixComparison.length; i++)
    {
        totalPoints.push(0);
        for (let j = 0; j < matrixComparison[i].length; j++)
        {
            totalPoints[i] = totalPoints[i] + matrixComparison[i][j];
        }
    }
    return totalPoints;
}

function findLastOption(loser1: number, loser2: number){

    let arr: Array<boolean> = [true, true, true];

    arr[loser1] = false;
    arr[loser2] = false;

    let winner: number = 100;

    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i]) { winner = i }
    }

    return winner;
}
