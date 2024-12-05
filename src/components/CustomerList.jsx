import { useState } from 'react';
import CreateCustomerForm from './CreateCustomerForm';
import ListLayout from './ListLayout';

function CustomerList({ customers, setCustomers, isLoading }) {
    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'lastname', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'streetaddress', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'postcode', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'city', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'email', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'phone', filter: 'agTextColumnFilter', floatingFilter: true }
    ]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ListLayout
            title="Customer List"
            isLoading={isLoading}
            buttonLabel="Create new customer"
            onButtonClick={handleOpen}
            dialogTitle="Create new customer"
            dialogOpen={open}
            handleDialogClose={handleClose}
            dialogContent={<CreateCustomerForm setCustomers={setCustomers} handleClose={handleClose} />}
            rowData={customers}
            columnDefs={columnDefs}
        />
    );
}

export default CustomerList;