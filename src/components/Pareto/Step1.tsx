'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

export const Step1 = () => {
    const containerStyle = useMemo(() => ({ width: '85%', height: '40%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [rowData, setRowData] = useState<any[]>(
        [  {"crits":"Критерий 1","var1":"1","var2":"1","var3":"1"},
                    {"crits":"Критерий 2", "var1":"1","var2":"1","var3":"1"},
                    {"crits":"Критерий 3", "var1":"1","var2":"1","var3":"1"},]
    );

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crits' },
        { field: 'var1' },
        { field: 'var2' },
        { field: 'var3' },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
        };
    }, []);

    function getRows(){
        let matrix: Array<Array<string>> = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];

        matrix[0][0] = rowData[0].var1;
        matrix[0][1] = rowData[1].var1;
        matrix[0][2] = rowData[2].var1;

        matrix[1][0] = rowData[0].var2;
        matrix[1][1] = rowData[1].var2;
        matrix[1][2] = rowData[2].var2;

        matrix[2][0] = rowData[0].var3;
        matrix[2][1] = rowData[1].var3;
        matrix[2][2] = rowData[2].var3;

        return matrix;
    }

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}

                ></AgGridReact>
            </div>
        </div>
    );
};


export function getRows()
{
    let matrix: Array<Array<String>> = Step1().props.getRows();

    return matrix;
}
