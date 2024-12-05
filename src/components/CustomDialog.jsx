// MaterialUI imports
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CustomDialog({ children, title, open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={() => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default CustomDialog;