// react imports
import { useEffect, useState } from "react";

// ag-grid imports
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// material ui imports
import { Typography } from "@mui/material";

// dayjs import
import dayjs from "dayjs";

// api function imports
import { getTrainingsWithCustomerInfo } from "../api/trainings";

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const data = await getTrainingsWithCustomerInfo();
                setTrainings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTrainings();
    }, []);

    // column defs
    const [columnDefs, setColumnDefs] = useState([
        { 
            field: 'customer', 
            filter: 'agTextColumnFilter', 
            floatingFilter: true, 
            valueFormatter: (data) => data.value.firstname + ' ' + data.value.lastname 
        },
        {
            field: 'date',
            cellDataType: 'date',
            filter: 'agDateColumnFilter',
            floatingFilter: true,
            valueFormatter: (data) => dayjs(data.value).format('DD.MM.YYYY HH:mm'),
        },
        { field: 'duration', cellDataType: 'number', filter: 'agNumberColumnFilter', floatingFilter: true },
        { field: 'activity', filter: 'agTextColumnFilter', floatingFilter: true },
    ]);

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Trainings List</Typography>
            {isLoading && <Typography>Loading...</Typography>}
            {!isLoading &&
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        rowData={trainings}
                        columnDefs={columnDefs}
                    />
                </div>
            }
        </div>
    )
}

export default TrainingList;