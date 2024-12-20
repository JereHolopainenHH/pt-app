import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { editCustomer } from '../api/customers';
import { useAlert } from './AlertProvider';
import FormFields from './FormFields';
import { getIdFromHref } from '../utils/getIdFromHref';

/**
 * EditCustomerForm component for editing an existing customer.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleClose - Function to close the form.
 * @param {Object} props.customer - The customer object to be edited.
 * @param {Function} props.setCustomers - Function to update customers state.
 * @param {Function} props.setTrainings - Function to update trainings state.
 * @returns {JSX.Element} The EditCustomerForm component.
 */
export default function EditCustomerForm({ handleClose, customer, setCustomers, setTrainings }) {
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
        setFormData({ ...customer });
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (JSON.stringify(customer) === JSON.stringify(formData)) {
                showAlert('No changes made', 'info');
                return;
            }
            const response = await editCustomer(customer, formData);
            setCustomers((prevCustomers) => prevCustomers.map(c => c._links.self.href === response._links.self.href ? response : c));
            setTrainings((prevTrainings) => prevTrainings.map(t => {
                const id = parseInt(getIdFromHref(response._links.self.href));
                return t.customer.id === id ? { ...t, customer: response } : t
            }));
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
            <FormFields fields={fields} formData={formData} handleChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">
                Edit
            </Button>
        </form>
    );
}