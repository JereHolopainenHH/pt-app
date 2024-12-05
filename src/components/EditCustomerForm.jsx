import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { editCustomer } from '../api/customers';
import { useAlert } from './AlertProvider';
import CustomTextField from './CustomTextField';

function EditCustomerForm({ handleClose, customer, setCustomers }) {
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

    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(JSON.stringify(customer) === JSON.stringify(formData)){
                showAlert('No changes made', 'info');
                return;
            }
            const response = await editCustomer(customer, formData);
            console.log(response);
            setCustomers((prevCustomers) => prevCustomers.map(c => c._links.self.href === response._links.self.href ? response : c));
            handleClose();
            showAlert('Customer updated successfully', 'success');
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
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                />
            ))}
            <Button type="submit" variant="contained" color="primary">
                Edit
            </Button>
        </form>
    );
}

export default EditCustomerForm;