import React, {useCallback, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";

export const PointScore: React.FC = () => {

    const [range, setRange] = useState('1');

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '128%', height: '40%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [rowData, setRowData] = useState<any[]>(
        [   {"crit1": 100, "crit2": 75,"crit3": 75,
            "crit4": 75,"crit5": 75,"crit6": 50,"crit7": 100,
            "crit8": 100,"crit9": 50,"crit10": 50} ]
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

    let criteriasNum: number = 10;

    function criteriasPoints() {
        let criteriasPoints: Array<number> = [100, 75, 75, 75, 75, 50, 100, 100, 50, 50];

        criteriasPoints[0] = rowData[0].crit1;
        criteriasPoints[1] = rowData[0].crit2;
        criteriasPoints[2] = rowData[0].crit3;
        criteriasPoints[3] = rowData[0].crit4;
        criteriasPoints[4] = rowData[0].crit5;
        criteriasPoints[5] = rowData[0].crit6;
        criteriasPoints[6] = rowData[0].crit7;
        criteriasPoints[7] = rowData[0].crit8;
        criteriasPoints[8] = rowData[0].crit9;
        criteriasPoints[9] = rowData[0].crit10;

        return criteriasPoints;
    }

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            width: 120,
        };
    }, []);

    let pointWeight: number = 1/countSumPoints(criteriasPoints());


    const columns = [
        { key: 'crit1', name: "Критерий 1" },
        { key: 'crit2', name: "Критерий 2" },
        { key: 'crit3', name: "Критерий 3" },
        { key: 'crit4', name: "Критерий 4" },
        { key: 'crit5', name: "Критерий 5" },
        { key: 'crit6', name: "Критерий 6" },
        { key: 'crit7', name: "Критерий 7" },
        { key: 'crit8', name: "Критерий 8" },
        { key: 'crit9', name: "Критерий 9" },
        { key: 'crit10', name: "Критерий 10" },    ];

    const rows = [
        { 'crit1': (countFinalPoints(criteriasPoints()))[0],
            'crit2': (countFinalPoints(criteriasPoints()))[1],
            'crit3': (countFinalPoints(criteriasPoints()))[2],
            'crit4': (countFinalPoints(criteriasPoints()))[3],
            'crit5': (countFinalPoints(criteriasPoints()))[4],
            'crit6': (countFinalPoints(criteriasPoints()))[5],
            'crit7': (countFinalPoints(criteriasPoints()))[6],
            'crit8': (countFinalPoints(criteriasPoints()))[7],
            'crit9': (countFinalPoints(criteriasPoints()))[8],
            'crit10':(countFinalPoints(criteriasPoints()))[9]}
    ];

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
                    <div style={{height: "300px"}}>
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

            <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>вывод суммы всех баллов</h3>
            {countSumPoints(criteriasPoints())}
            </div>

            <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
            <h3>вывод веса одного балла критерия</h3>
            {pointWeight}
                </div>

                    <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>вывод значений веса всех критериев</h3>
                            <DataGrid
                                columns={columns}
                                rows={rows}
                            />

                    </div>
                    <button className="btn btn-primary p-1"
                            onClick={onBtExport}
                    >
                        Export to Excel
                    </button>
                </div>
            </div>
        </div>
    )
}


function countSumPoints(points: Array<number>)
{
    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += Number(points[i]);
    }
    return sumPoints;
}


function countFinalPoints(critPoints: Array<number>)
{
    let sumPoints: number = 0;

    let criteriasFinalPoints: Array<number> = critPoints;

    for (let i = 0; i < critPoints.length; i++) {
        sumPoints += Number(critPoints[i]);
    }

    let pointWeight: number = 1/sumPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = critPoints[i] * pointWeight;
    }
    return  criteriasFinalPoints;
}

