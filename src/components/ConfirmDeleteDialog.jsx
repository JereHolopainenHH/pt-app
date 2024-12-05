import { useState, useEffect } from 'react';
import { Button, TextField, DialogActions, Typography } from '@mui/material';
import { useAlert } from './AlertProvider';
import { getIdFromCustomerHref } from '../utils/customerUtils';

function ConfirmDeleteDialog({ handleClose, item, setCustomers, setTrainings, deleteItem, itemType }) {
    const { showAlert } = useAlert();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [confirmText, setConfirmText] = useState('');

    useEffect(() => {
        if (item) {
            setConfirmText(itemType === 'customer' ? `${item.firstname} ${item.lastname}` : item.activity);
        }
    }, [item, itemType]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setError('');
    };

    const confirmDeletion = async () => {
        if (inputValue.toLowerCase() === confirmText.toLowerCase()) {
            try {
                if (itemType === 'customer') {
                    await deleteItem(item);
                    const id = getIdFromCustomerHref(item._links.self.href);
                    setCustomers((prev) => prev.filter((i) => i._links.self.href !== item._links.self.href));
                    setTrainings((prev) => prev.filter((t) => t.customer.id !== parseInt(id)));
                } else if (itemType === 'training') {
                    await deleteItem(item.id);
                    setTrainings((prev) => prev.filter((i) => i.id !== item.id));
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
                <Button onClick={confirmDeletion} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </>
    );
}

export default ConfirmDeleteDialog;