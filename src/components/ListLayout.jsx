import { Typography, Container, Button } from '@mui/material';
import CustomGrid from './CustomGrid';
import CustomDialog from './CustomDialog';
import { FadeLoader } from 'react-spinners';

const ListLayout = ({
    title,
    isLoading,
    buttonLabel,
    onButtonClick,
    dialogTitle,
    dialogOpen,
    handleDialogClose,
    dialogContent,
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
                    <CustomDialog title={dialogTitle} open={dialogOpen} handleClose={handleDialogClose}>
                        {dialogContent}
                    </CustomDialog>
                </>
            )}
        </Container>
    );
};

export default ListLayout;