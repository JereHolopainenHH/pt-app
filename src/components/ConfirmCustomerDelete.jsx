import { useState } from 'react';
import { Button, TextField, DialogActions, Typography } from '@mui/material';
import { deleteCustomer } from '../api/customers';
import { useAlert } from './AlertProvider';

function ConfirmCustomerDelete({ handleClose, customer, setCustomers }) {
    const { showAlert } = useAlert();

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const fullName = `${customer?.firstname} ${customer?.lastname}`;

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setError('');
    };

    const handleConfirmClick = async () => {
        if (inputValue.toLowerCase() === fullName.toLowerCase()) {
            console.log('Delete confirmed', customer);
            try {
                await deleteCustomer(customer);
                showAlert(`Customer ${fullName} deleted successfully`, 'success');
                setCustomers((prev) => prev.filter((c) => c._links.self.href !== customer._links.self.href));
                handleClose();
            } catch (error) {
                showAlert(error.message, 'error');
                return
            }
        } else {
            setError('The name does not match.');
        }
    };

    return (
        <>
            <Typography variant="body1" gutterBottom>
                To confirm deletion, please enter the full name of the customer:
            </Typography>
            <Typography variant="h6" gutterBottom>
                <strong>{fullName}</strong>
            </Typography>
            <TextField
                label="Full Name"
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
    )
}

export default ConfirmCustomerDelete;