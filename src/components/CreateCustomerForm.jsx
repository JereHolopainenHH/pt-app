import { useState } from 'react';
import { Button } from '@mui/material';
import { createCustomer } from '../api/customers';
import { useAlert } from './AlertProvider';
import FormFields from './FormFields';

function CreateCustomerForm({ handleClose, setCustomers }) {
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
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
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCustomer(formData);
            setCustomers((prevCustomers) => [response, ...prevCustomers]);
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
            <FormFields fields={fields} formData={formData} handleChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">
                Create
            </Button>
        </form>
    );
}

export default CreateCustomerForm;