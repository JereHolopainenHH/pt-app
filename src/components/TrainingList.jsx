import { useState } from "react";
import dayjs from "dayjs";
import CreateTrainingForm from "./CreateTrainingForm";
import ListLayout from './ListLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { deleteTraining } from "../api/trainings";
import ConfirmDelete from "./ConfirmDelete";

function TrainingList({ trainings, setTrainings, isLoading }) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);

    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);

    const handleOpenDelete = (training) => {
        setSelectedTraining(training);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => setOpenDelete(false);

    const handleConfirmDelete = () => {
        handleCloseDelete();
    };
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'actions',
            cellRenderer: (params) => {
                const onDelete = () => handleOpenDelete(params.data);

                return (
                    <Button onClick={onDelete} variant="contained" color="error">
                        <DeleteIcon />
                    </Button>
                )
            },
            filter: false,
            sortable: false,
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

    return (
        <ListLayout
            title="Trainings"
            isLoading={isLoading}
            buttonLabel="Create new training"
            onButtonClick={handleOpenCreate}
            createDialog={{
                title: "Create new training",
                open: openCreate,
                handleClose: handleCloseCreate,
                content: <CreateTrainingForm setTrainings={setTrainings} handleClose={handleCloseCreate} />
            }}
            deleteDialog={{
                title: "Delete Training",
                open: openDelete,
                handleClose: handleCloseDelete,
                onConfirm: handleConfirmDelete,
                content: <ConfirmDelete
                    handleClose={handleCloseDelete}
                    item={selectedTraining}
                    setItems={setTrainings}
                    deleteItem={deleteTraining}
                    itemType="training"
                />
            }}
            rowData={trainings}
            columnDefs={columnDefs}
        />
    );
}

export default TrainingList;