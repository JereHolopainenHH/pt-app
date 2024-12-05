import { useState } from 'react';
import CreateCustomerForm from './CreateCustomerForm';
import ListLayout from './ListLayout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import EditCustomerForm from './EditCustomerForm';
import ConfirmCustomerDelete from './ConfirmCustomerDelete';

function CustomerList({ customers, setCustomers, isLoading }) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);

    const handleOpenEdit = (customer) => {
        setSelectedCustomer(customer);
        console.log(customer);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (customer) => {
        setSelectedCustomer(customer);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => setOpenDelete(false);

    const handleConfirmDelete = () => {
        // Implement delete functionality
        console.log('Delete confirmed', selectedCustomer);
        handleCloseDelete();
    };

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'actions',
            cellRenderer: (params) => {
                const onEdit = () => handleOpenEdit(params.data);
                const onDelete = () => handleOpenDelete(params.data);

                return (
                    <div>
                        <Button onClick={onEdit} variant="contained" color="warning" sx={{ mr: 2 }}>
                            <EditIcon />
                        </Button>
                        <Button onClick={onDelete} variant="contained" color="error">
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            },
        },
        { field: 'firstname', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'lastname', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'streetaddress', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'postcode', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'city', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'email', filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'phone', filter: 'agTextColumnFilter', floatingFilter: true }
    ]);

    return (
        <ListLayout
            title="Customer List"
            isLoading={isLoading}
            buttonLabel="Create new customer"
            onButtonClick={handleOpenCreate}
            createDialog={{
                title: "Create new customer",
                open: openCreate,
                handleClose: handleCloseCreate,
                content: <CreateCustomerForm setCustomers={setCustomers} handleClose={handleCloseCreate} />
            }}
            editDialog={{
                title: "Edit Customer",
                open: openEdit,
                handleClose: handleCloseEdit,
                content: <EditCustomerForm handleClose={handleCloseEdit} customer={selectedCustomer} setCustomers={setCustomers} />
            }}
            deleteDialog={{
                title: "Delete Customer",
                open: openDelete,
                handleClose: handleCloseDelete,
                onConfirm: handleConfirmDelete,
                content: <ConfirmCustomerDelete handleClose={handleCloseDelete} customer={selectedCustomer} setCustomers={setCustomers} />
            }}
            rowData={customers}
            columnDefs={columnDefs}
        />
    );
}

export default CustomerList;