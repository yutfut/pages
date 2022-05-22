import React, {useCallback, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";

export const PointScore: React.FC = () => {

    const [range, setRange] = useState('1');


    return(
        <div className="container">

            <div className="row">
                <div className="col col-3">
                    <h2>Навигация</h2>
                    <Hub/>
                </div>

                <div className="col">
            <h2>Определение весовых коэффициентов методом бальной оценки</h2>

            <div className="border-danger">
                <label htmlFor="customRange" className="form-label p-3" >Показать шаги:</label>
                <input type="range" className="form-range p-3"
                       style={{width: 150, verticalAlign: "middle" }}
                       min="1" max="4" step="1"
                       onChange={(e) => setRange(e.target.value) }
                       value = {range}
                       id="customRange"/>
                {range}
            </div>

            <h3>таблица для ввода значений критериев</h3>
            {printNumArray(criteriasPoints)}

                    <Step1/>
                    <div className="p-3"></div>

            <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>вывод суммы всех баллов</h3>
            {countSumPoints(criteriasPoints).toString()}
            </div>

            <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>вывод веса одного балла критерия</h3>
            {pointWeight.toString()}
            </div>

            <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>вывод значений веса всех критериев</h3>
            {printNumArray(countFinalPoints(criteriasPoints))}
            </div>
        </div>
            </div>
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

export const Step1 = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '128%', height: '40%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [rowData, setRowData] = useState<any[]>(
        [   {"crit1": 1, "crit2": 1,"crit3": 1,
            "crit4": 1,"crit5": 1,"crit6": 1,"crit7": 1,
            "crit8": 1,"crit9": 1,"crit10": 1,} ]
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
            width: 110,
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
