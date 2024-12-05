// react imports
import { useState } from 'react';
import { Button } from '@mui/material';
import { createCustomer } from '../api/customers';
import { useAlert } from './AlertProvider';
import CustomTextField from './CustomTextField';

function CreateCustomerForm({ handleClose, setCustomers }) {
    const { showAlert } = useAlert();

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCustomer(customer);
            setCustomers((prevCustomers) => [...prevCustomers, response]);
            handleClose();
            showAlert('Customer created successfully', 'success');
        } catch (error) {
            showAlert(error.message, 'error');
        }
    }

    const fields = [
        { label: 'First name', name: 'firstname' },
        { label: 'Last name', name: 'lastname' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Phone', name: 'phone' },
        { label: 'Street address', name: 'streetaddress' },
        { label: 'Postcode', name: 'postcode' },
        { label: 'City', name: 'city' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <CustomTextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    value={customer[field.name]}
                    onChange={handleChange}
                />
            ))}
            <Button type="submit" variant="contained" color="primary">
                Create
            </Button>
        </form>
    );
}

export default CreateCustomerForm;