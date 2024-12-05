import { Typography, Container, Button } from '@mui/material';
import CustomGrid from './CustomGrid';
import CustomDialog from './CustomDialog';
import { FadeLoader } from 'react-spinners';

const ListLayout = ({
    title,
    isLoading,
    buttonLabel,
    onButtonClick,
    createDialog,
    editDialog,
    deleteDialog,
    rowData,
    columnDefs,
}) => {
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

export default ListLayout;