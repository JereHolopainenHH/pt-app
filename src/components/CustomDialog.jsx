import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * CustomDialog component for displaying a dialog with a title and close button.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the dialog.
 * @param {string} props.title - The title of the dialog.
 * @param {boolean} props.open - Boolean indicating whether the dialog is open.
 * @param {Function} props.handleClose - Function to close the dialog.
 * @returns {JSX.Element} The CustomDialog component.
 */
export default function CustomDialog({ children, title, open, handleClose }) {
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