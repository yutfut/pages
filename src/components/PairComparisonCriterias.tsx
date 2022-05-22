import React, {useCallback, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";

export const PairComparisonCriterias: React.FC = () => {

    const [range, setRange] = useState('1');

    return(
        <div className="container">

            <div className="row">
                <div className="col col-3">
                    <h2>Навигация</h2>
                    <Hub/>
                </div>

                <div className="col">
            <h2>Определение весовых коэффициентов методом парного сравнения критериев</h2>

            <div className="border-danger">
                <label htmlFor="customRange" className="form-label p-3" >Показать шаги:</label>
                <input type="range" className="form-range p-3"
                       style={{width: 150, verticalAlign: "middle" }}
                       min="1" max="5" step="1"
                       onChange={(e) =>
                       {
                           setRange(e.target.value);
                       }
                       }
                       value = {range}
                       id="customRange"/>
                {range}
            </div>

            <h3>таблица с матрицей сравнения</h3>
            {printmatrix(criteriasComparison)}

                    <Step1/>
                    <div className="p-3"></div>

            <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Вывод баллов каждого критерия</h3>
            {countCriteriasPoints(criteriasComparison).toString()}
            </div>

            <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Сумма баллов всех критериев</h3>
            {countSumPoints(countCriteriasPoints(criteriasComparison))}
            </div>

            <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Вес одного балла</h3>
            {getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison)))}
            </div>

            <div className={(range >= "5") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>Итоговое значение критериев</h3>
            {countFinalPoints(countCriteriasPoints(criteriasComparison),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison))))}
            </div>
            </div>
            </div>
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

export const Step1 = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '128%', height: '150%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [rowData, setRowData] = useState<any[]>(
        [
            {"crit1": 1, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 1,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 1, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 1,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 1,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 1,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 1, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 1,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 1,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 1,}]
    );

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crit1', headerName: "Критерий 1" },
        { field: 'crit2', headerName: "Критерий 2" },
        { field: 'crit3', headerName: "Критерий 3" },
        { field: 'crit4', headerName: "Критерий 4" },
        { field: 'crit5', headerName: "Критерий 5" },
        { field: 'crit6', headerName: "Критерий 6" },
        { field: 'crit7', headerName: "Критерий 7" },
        { field: 'crit8', headerName: "Критерий 8" },
        { field: 'crit9', headerName: "Критерий 9" },
        { field: 'crit10', headerName: "Критерий 10" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            width: 120,
        };
    }, []);


    return (
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
    );
};