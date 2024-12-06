import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


/**
 * CustomGrid component for displaying data in a grid format using ag-Grid.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.rowData - Array of data to be displayed in the grid.
 * @param {Array} props.columnDefs - Array of column definitions for the grid.
 * @returns {JSX.Element} The CustomGrid component.
 */
export default function CustomGrid({ rowData, columnDefs }) {
    return (
        <div className="ag-theme-alpine" style={{height: "80vh"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                rowHeight={50}
            />
        </div>
    )
}