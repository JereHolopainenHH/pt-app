// react imports
import { useEffect, useState } from 'react';

// material ui imports
import { Box, Typography } from '@mui/material';

// ag-grid imports
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// api function imports
import { getCustomers } from '../api/customers';

function CustomerList() {
    // states
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // fetch customers from the backend when the component is rendered
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers(); // fetch customers from the backend
                setCustomers(data._embedded.customers); // set the customers to the state
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    // column defs
    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'lastname', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'streetaddress', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'postcode', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'city', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'email', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'phone', filter: 'agTextColumnFilter', floatingFilter: true }
    ]);

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>
                Customer List
            </Typography>
            {isLoading && <Typography>Loading...</Typography>}
            {!isLoading &&
                <div className="ag-theme-alpine" style={{ height: 400, widht: '100%' }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columnDefs}
                    />
                </div>
            }
        </div>
    )
}

export default CustomerList;