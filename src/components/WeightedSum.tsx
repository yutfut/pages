import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";
import {ParetoData, ParetoDataI} from "./Pareto";
import {useSearchParams} from "react-router-dom";

export interface WeightedSumData {
    Id:         number;
    Name:       string;
    Var1:       string[];
    Var2:       number[];
    Var3:       number[];
    Var4:       number[];
    Var5:       number[];
}

export type WeightedSumDataI = WeightedSumData[]|null

export const WeightedSum: React.FC = () => {

    const [weightedSumData, setWeightedSumData] = useState<WeightedSumDataI>(null)
    const [searchParams] = useSearchParams();

    useEffect(() => {
            if (weightedSumData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_weighted_sum?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setWeightedSumData(responseBody)
                        console.log(responseBody)
                        console.log(weightedSumData)
                        console.log(setWeightedSumData)
                    } else{
                        console.log('prosas')
                    }
                }
            }) ()
        },[searchParams]
    )

    const [range, setRange] = useState('1');

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '78%', height: '95%'}), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crits', headerName: "Критерий" },
        { field: 'weights', headerName: "Вес критерия" },
        { field: 'var1', headerName: "Вариант 1" },
        { field: 'var2', headerName: "Вариант 2" },
        { field: 'var3', headerName: "Вариант 3" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            width: 140
        };
    }, []);



    const [rowData, setRowData] = useState<any[]>(
        [
            {"crits":"Критерий 1", "weights": 0.157, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 2", "weights": 0.095, "var1": 1,"var2": 1, "var3": 0.75},
            {"crits":"Критерий 3", "weights": 0.095, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 4", "weights": 0.095, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 5", "weights": 0.095, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 6", "weights": 0.05,  "var1": 0.5,"var2": 1, "var3": 1},
            {"crits":"Критерий 7", "weights": 0.157, "var1": 0.67,"var2": 0.83, "var3": 1},
            {"crits":"Критерий 8", "weights": 0.157, "var1": 0.667,"var2": 0.833, "var3": 0},
            {"crits":"Критерий 9", "weights": 0.05,  "var1": 1,"var2": 0.8, "var3": 0.9},
            {"crits":"Критерий 10", "weights": 0.05,  "var1": 1,"var2": 0.9, "var3": 0.9}]
    );

    let criteriasNum: number = 10;

    function criteriasWeight() {

        let criteriasWeight: Array<number> = [0.157, 0.095, 0.095, 0.095, 0.095, 0.05, 0.157, 0.157, 0.05, 0.05];

        for (let i = 0; i< 10; i++){
            criteriasWeight[i] = rowData[i].weights;
        }
        return criteriasWeight
    }

    function critVars() {
        let critVars: Array<Array<number>> = [
            [1, 0.89, 0.83],
            [1, 1, 0.75],
            [1, 0.89, 0.83],
            [1, 0.89, 0.83],
            [1, 0.89, 0.83],
            [0.5, 1, 1],
            [0.67, 0.83, 1],
            [0.667, 0.833, 1],
            [1, 0.8, 0.9],
            [1, 0.9, 0.9]];

        for (let i = 0; i<10; i++){
            critVars[i][0] = rowData[i].var1;
            critVars[i][1] = rowData[i].var2;
            critVars[i][2] = rowData[i].var3;
        }
        return critVars;
    }

    const columns = [
        { key: 'crits', name: "Критерии" },
        { key: 'var1', name: "Вариант 1" },
        { key: 'var2', name: "Вариант 2" },
        { key: 'var3', name: "Вариант 3" }];

    const rows = [
        { 'crits' : "Критерий 1", 'var1' :  NormingCrits(critVars())[0][0], 'var2' :  NormingCrits(critVars())[0][1],  'var3' : NormingCrits(critVars())[0][2]},
        { 'crits' : "Критерий 2", 'var1' :  NormingCrits(critVars())[1][0], 'var2' :  NormingCrits(critVars())[1][1],  'var3' : NormingCrits(critVars())[1][2]},
        { 'crits' : "Критерий 3", 'var1' :  NormingCrits(critVars())[2][0], 'var2' :  NormingCrits(critVars())[2][1],  'var3' : NormingCrits(critVars())[2][2]},
        { 'crits' : "Критерий 4", 'var1' :  NormingCrits(critVars())[3][0], 'var2' :  NormingCrits(critVars())[3][1],  'var3' : NormingCrits(critVars())[3][2]},
        { 'crits' : "Критерий 5", 'var1' :  NormingCrits(critVars())[4][0], 'var2' :  NormingCrits(critVars())[4][1],  'var3' : NormingCrits(critVars())[4][2]},
        { 'crits' : "Критерий 6", 'var1' :  NormingCrits(critVars())[5][0], 'var2' :  NormingCrits(critVars())[5][1],  'var3' : NormingCrits(critVars())[5][2]},
        { 'crits' : "Критерий 7", 'var1' :  NormingCrits(critVars())[6][0], 'var2' :  NormingCrits(critVars())[6][1],  'var3' : NormingCrits(critVars())[6][2]},
        { 'crits' : "Критерий 8", 'var1' :  NormingCrits(critVars())[7][0], 'var2' :  NormingCrits(critVars())[7][1],  'var3' : NormingCrits(critVars())[7][2]},
        { 'crits' : "Критерий 9", 'var1' :  NormingCrits(critVars())[8][0], 'var2' :  NormingCrits(critVars())[8][1],  'var3' : NormingCrits(critVars())[8][2]},
        { 'crits' : "Критерий 10", 'var1' :  NormingCrits(critVars())[9][0], 'var2' :  NormingCrits(critVars())[9][1],  'var3' : NormingCrits(critVars())[9][2]}
    ]

    const columns2 = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" },
    ];

    const rows2 = [
        { 'crit1': countWeight(NormingCrits(critVars()),criteriasWeight() )[0],
            'crit2': countWeight(NormingCrits(critVars()),criteriasWeight() )[1],
            'crit3': countWeight(NormingCrits(critVars()),criteriasWeight() )[2]}
    ];


    return(
        <div className="Base">
            <div>
                <h2>Принятие решений с использованием интегрального критерия взвешенной суммы показателей сравнения</h2>
                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="4" step="1"
                               onChange={(e) =>setRange(e.target.value) }
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

                <h3>Таблица для ввода значений критериев</h3>
                <div style={{height: "496px"}}>
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
                    <h3>Таблица с нормированными значениями</h3>
                    <DataGrid columns={columns} rows={rows}/>
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Одномерная таблица с подсчитанной взвешенной суммой для каждого варианта</h3>
                    <DataGrid columns={columns2} rows={rows2}/>
                </div>

                <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вывод номера лучшего варианта</h3>
                    {findBestOption(countWeight(NormingCrits(critVars()),criteriasWeight() ))}
                </div>
            </div>
        </div>
    )
}


function NormingCrits (matrix: Array<Array<number>>){
    let maxPoint: number;
    for (let i = 0; i < matrix.length; i++)
    {
        maxPoint = 0;
        for (let j = 0; j < matrix[i].length; j++)
        {
            if (matrix[i][j] > maxPoint)
            {
                maxPoint = matrix[i][j];
            }
        }

        for (let j = 0; j < matrix[i].length; j++)
        {
            matrix[i][j] = matrix[i][j]/maxPoint;
        }
    }
    return matrix;
}


function countWeight (matrix: Array<Array<number>>, criteriasWeight: Array<number>)
{
    let totalPoints: Array<number> = [0,0,0]

    for (let i = 0; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix[i].length; j++)
        {
            totalPoints[j] = totalPoints[j] + criteriasWeight[i]*matrix[i][j];
        }
    }
    return totalPoints;
}


function findBestOption(pointArray: Array<number>) {
    let bestOption: number = 0;

    for (let i = 0; i < pointArray.length; i++) {
        if (pointArray[i] > pointArray[bestOption]) {
            bestOption = i;
        }
    }

    return ("Лучший вариант: " + (bestOption + 1));
}
