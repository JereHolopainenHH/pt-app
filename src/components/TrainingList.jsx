import { useState } from "react";
import dayjs from "dayjs";
import CreateTrainingForm from "./CreateTrainingForm";
import ListLayout from './ListLayout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

function TrainingList({ trainings, setTrainings, isLoading }) {
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'actions',
            cellRenderer: (params) => {
                const onEdit = () => console.log('Edit', params.data);
                const onDelete = () => console.log('Delete', params.data);

                return (
                    <div>
                        <Button onClick={onEdit} variant="contained" color="warning" sx={{mr: 2}}>
                            <EditIcon />
                        </Button>
                        <Button onClick={onDelete} variant="contained" color="error">
                            <DeleteIcon />
                        </Button>
                    </div>
                )
            },
        },
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
            valueFormatter: (data) => dayjs(data.value).format('DD/MM/YYYY HH:mm'),
        },
        { field: 'duration', cellDataType: 'number', filter: 'agNumberColumnFilter', floatingFilter: true },
        { field: 'activity', filter: 'agTextColumnFilter', floatingFilter: true },
    ]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ListLayout 
            title="Trainings List" 
            isLoading={isLoading}
            buttonLabel="Create new training"
            onButtonClick={handleOpen}
            dialogTitle="Create new training"
            dialogOpen={open}
            handleDialogClose={handleClose}
            dialogContent={<CreateTrainingForm setTrainings={setTrainings} trainings={trainings} handleClose={handleClose} />}
            rowData={trainings}
            columnDefs={columnDefs}
        />
    );
}

export default TrainingList;