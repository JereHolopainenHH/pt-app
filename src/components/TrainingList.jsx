import { useState } from "react";
import dayjs from "dayjs";
import CreateTrainingForm from "./CreateTrainingForm";
import ListLayout from './ListLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { deleteTraining } from "../api/trainings";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

/**
 * TrainingList component for displaying and managing training sessions.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.trainings - Array of training objects.
 * @param {Array} props.customers - Array of customer objects.
 * @param {Function} props.setTrainings - Function to update trainings state.
 * @param {boolean} props.isLoading - Boolean indicating whether the data is loading.
 * @returns {JSX.Element} The TrainingList component.
 */
export default function TrainingList({ trainings, customers, setTrainings, isLoading }) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);

    const openCreateDialog = () => setOpenCreate(true);
    const closeCreateDialog = () => setOpenCreate(false);

    const openDeleteDialog = (training) => {
        setSelectedTraining(training);
        setOpenDelete(true);
    };
    const closeDeleteDialog = () => {
        setSelectedTraining(null);
        setOpenDelete(false);
    };

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'actions',
            cellRenderer: (params) => {
                const onDelete = () => openDeleteDialog(params.data);
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
            valueFormatter: (data) => data?.value && data.value.firstname + ' ' + data.value.lastname

        },
        {
            field: 'date',
            cellDataType: 'date',
            filter: 'agDateColumnFilter',
            floatingFilter: true,
            valueFormatter: (data) => dayjs(data.value).format('DD/MM/YYYY HH:mm'),
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = dayjs(cellValue).startOf('day').toDate();
                    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                        return 0;
                    }
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    }
                    if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    }
                }
            },
        },
        { field: 'duration', cellDataType: 'number', filter: 'agNumberColumnFilter', floatingFilter: true },
        { field: 'activity', filter: 'agTextColumnFilter', floatingFilter: true, flex: 1 },
    ]);

    return (
        <ListLayout
            title="Trainings"
            isLoading={isLoading}
            buttonLabel="Create new training"
            onButtonClick={openCreateDialog}
            createDialog={{
                title: "Create new training",
                open: openCreate,
                handleClose: closeCreateDialog,
                content: <CreateTrainingForm setTrainings={setTrainings} handleClose={closeCreateDialog} customers={customers} />
            }}
            deleteDialog={{
                title: "Delete Training",
                open: openDelete,
                handleClose: closeDeleteDialog,
                onConfirm: closeDeleteDialog,
                content: <ConfirmDeleteDialog
                    handleClose={closeDeleteDialog}
                    item={selectedTraining}
                    setTrainings={setTrainings}
                    deleteItem={deleteTraining}
                    itemType="training"
                />
            }}
            rowData={trainings}
            columnDefs={columnDefs}
        />
    );
}