import { Typography, Container, Button } from '@mui/material';
import CustomGrid from './CustomGrid';
import CustomDialog from './CustomDialog';
import { FadeLoader } from 'react-spinners';

/**
 * ListLayout component for displaying a list with create, edit, and delete dialogs.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the list.
 * @param {boolean} props.isLoading - Boolean indicating whether the data is loading.
 * @param {string} props.buttonLabel - The label for the create button.
 * @param {Function} props.onButtonClick - Function to handle create button click.
 * @param {Object} props.createDialog - Object containing create dialog properties.
 * @param {Object} [props.editDialog] - Object containing edit dialog properties.
 * @param {Object} props.deleteDialog - Object containing delete dialog properties.
 * @param {Array} props.rowData - Array of data to be displayed in the grid.
 * @param {Array} props.columnDefs - Array of column definitions for the grid.
 * @returns {JSX.Element} The ListLayout component.
 */
export default function ListLayout({
    title,
    isLoading,
    buttonLabel,
    onButtonClick,
    createDialog,
    editDialog,
    deleteDialog,
    rowData,
    columnDefs,
}) {
    return (
        <Container sx={{ mt: "80px" }}>
            <Typography variant="h4" sx={{ my: 2 }}>
                {title}
            </Typography>
            {isLoading && <FadeLoader />}
            {!isLoading && (
                <>
                    <Button onClick={onButtonClick} variant='contained' sx={{ mb: 2 }}>{buttonLabel}</Button>
                    <CustomGrid rowData={rowData} columnDefs={columnDefs} />
                    <CustomDialog title={createDialog.title} open={createDialog.open} handleClose={createDialog.handleClose}>
                        {createDialog.content}
                    </CustomDialog>
                    {
                        editDialog && (
                            <CustomDialog title={editDialog.title} open={editDialog.open} handleClose={editDialog.handleClose}>
                                {editDialog.content}
                            </CustomDialog>
                        )
                    }
                    <CustomDialog title={deleteDialog.title} open={deleteDialog.open} handleClose={deleteDialog.handleClose} onConfirm={deleteDialog.onConfirm}>
                        {deleteDialog.content}
                    </CustomDialog>
                </>
            )}
        </Container>
    );
};