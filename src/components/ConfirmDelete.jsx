import { useState } from 'react';
import { Button, TextField, DialogActions, Typography } from '@mui/material';
import { useAlert } from './AlertProvider';

function ConfirmDelete({ handleClose, item, setItems, deleteItem, itemType }) {
    const { showAlert } = useAlert();

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const confirmText = itemType === 'customer' ? `${item.firstname} ${item.lastname}` : item.activity;

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setError('');
    };

    console.log("item", item);

    const handleConfirmClick = async () => {
        if (inputValue.toLowerCase() === confirmText.toLowerCase()) {
            try {
                if (itemType === 'customer') {
                    await deleteItem(item);
                    setItems((prev) => prev.filter((i) => i._links.self.href !== item._links.self.href));
                } else if (itemType === 'training') {
                    await deleteItem(item.id);
                    setItems((prev) => prev.filter((i) => i.id !== item.id));
                }
                showAlert(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully`, 'success');
                handleClose();
            } catch (error) {
                showAlert(error.message, 'error');
                return;
            }
        } else {
            setError('The input does not match the required confirmation text.');
        }
    };

    return (
        <>
            <Typography variant="body1" gutterBottom>
                To confirm deletion, please enter the {itemType === 'customer' ? 'full name of the customer' : 'name of the training\'s activity'}:
            </Typography>
            <Typography variant="h6" gutterBottom>
                <strong>{confirmText}</strong>
            </Typography>
            <TextField
                label="Confirmation Text"
                value={inputValue}
                onChange={handleChange}
                fullWidth
                error={!!error}
                helperText={error}
            />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmClick} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </>
    );
}

export default ConfirmDelete;