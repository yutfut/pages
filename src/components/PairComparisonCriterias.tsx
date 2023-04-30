import React, {useCallback, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";

export const PairComparisonCriterias: React.FC = () => {

    const [range, setRange] = useState('1');

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '128%', height: '98%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

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

    let criteriasNum: number = 10;

    function criteriasComparison()
    {
        let criteriasComparison: Array<Array<number>> = [
            [1,	    1,	    1,	    1,	    1,	    1,	    0.5,	0.5,	1,	    1],
            [0,	    1,	    0.5,	0.5,	0.5,	1,	    0,	    0,	    1,	    1],
            [0,	    0.5,	1,	    0.5,	0.5,	1,	    0,	    0,	    1,	    1],
            [0,	    0.5,	0.5,	1,	    0.5,	1,	    0,	    0,	    1,	    1],
            [0,	    0.5,	0.5,	0.5,	1,	    1,	    0,	    0,	    1,	    1],
            [0,	    0,	    0,	    0,	    0,	    1,	    0,	    0,	    0.5,	0.5],
            [0.5,	1,	    1,	    1,	    1,	    1,	    1,	    0.5,	1,	    1],
            [0.5,	1,	    1,	    1,	    1,	    1,	    0.5,	1,	    1,	    1],
            [0,	    0,	    0,	    0,	    0,	    0.5,	0,	    0,	    1,	    0.5],
            [0,	    0,	    0,	    0,	    0,	    0.5,	0,	    0,	    0.5,	1]];

        for (let i = 0; i<10; i++)
        {
            criteriasComparison[i][0] = rowData[i].crit1;
            criteriasComparison[i][1] = rowData[i].crit2;
            criteriasComparison[i][2] = rowData[i].crit3;
            criteriasComparison[i][3] = rowData[i].crit4;
            criteriasComparison[i][4] = rowData[i].crit5;
            criteriasComparison[i][5] = rowData[i].crit6;
            criteriasComparison[i][6] = rowData[i].crit7;
            criteriasComparison[i][7] = rowData[i].crit8;
            criteriasComparison[i][8] = rowData[i].crit9;
            criteriasComparison[i][9] = rowData[i].crit10;
        }

        return criteriasComparison;
    }

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

    const rows1 = [
        {   'crit1': countCriteriasPoints(criteriasComparison())[0],
            'crit2': countCriteriasPoints(criteriasComparison())[1],
            'crit3': countCriteriasPoints(criteriasComparison())[2],
            'crit4': countCriteriasPoints(criteriasComparison())[3],
            'crit5': countCriteriasPoints(criteriasComparison())[4],
            'crit6': countCriteriasPoints(criteriasComparison())[5],
            'crit7': countCriteriasPoints(criteriasComparison())[6],
            'crit8': countCriteriasPoints(criteriasComparison())[7],
            'crit9': countCriteriasPoints(criteriasComparison())[8],
            'crit10':countCriteriasPoints(criteriasComparison())[9]}
    ];


    const rows2 = [
        {   'crit1': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[0],
            'crit2': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[1],
            'crit3': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[2],
            'crit4': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[3],
            'crit5': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[4],
            'crit6': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[5],
            'crit7': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[6],
            'crit8': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[7],
            'crit9': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[8],
            'crit10':countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[9]}
];

    return(
        <div className="Base">
            <div>
                <h2>Определение весовых коэффициентов методом парного сравнения критериев</h2>
                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="5" step="1"
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

                <h3>таблица с матрицей сравнения</h3>

                <div style={{height: "480px"}}>
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
                    <h3>Вывод баллов каждого критерия</h3>
                    <DataGrid columns={columns} rows={rows1}/>
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Сумма баллов всех критериев</h3>
                    {countSumPoints(countCriteriasPoints(criteriasComparison()))}
                </div>

                <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вес одного балла</h3>
                    {getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison())))}
                </div>

                <div className={(range >= "5") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Итоговое значение критериев</h3>
                    <DataGrid columns={columns} rows={rows2}/>
                </div>
            </div>
        </div>
    )
}


function countCriteriasPoints(critsComparison: Array<Array<number>>)
{
    let criteriasPoints: Array<number> = [0,0,0,0,0,0,0,0,0,0]

    for (let i = 0; i < critsComparison.length; i++)
    {
        for (let j = 0; j < critsComparison[i].length; j++)
        {
            criteriasPoints[i] = Number( Number(criteriasPoints[i]) + Number(critsComparison[i][j]));
        }
    }

    return criteriasPoints;
}


function countSumPoints(points: Array<number>) {

    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += Number(points[i]);
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
        criteriasFinalPoints[i] = Number(Number(criteriasPoints[i]) * Number(pointWeight));
    }

    return  criteriasFinalPoints;
}
