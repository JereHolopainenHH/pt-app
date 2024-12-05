import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTraining } from '../api/trainings';
import { useAlert } from './AlertProvider';
import { getUniqueCustomersFromTrainings } from '../utils/trainingUtils';
import { formatCustomerHref, formatTrainingResponse } from '../utils/trainingUtils';
import FormFields from './FormFields';

function CreateTrainingForm({ handleClose, setTrainings, trainings }) {
    const { showAlert } = useAlert();
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        date: dayjs(new Date()).toISOString(),
        activity: '',
        duration: '',
        customerHref: ''
    });

    useEffect(() => {
        const fetchCustomers = () => {
            const uniqueCustomers = getUniqueCustomersFromTrainings(trainings);
            setCustomers(uniqueCustomers);
            if (uniqueCustomers.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    customerHref: formatCustomerHref(uniqueCustomers[0].id)
                }));
            }
        };
        fetchCustomers();
    }, [trainings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, date: newValue.toISOString() }));
    }

    const handleCustomerChange = (e) => {
        setFormData(prev => ({ ...prev, customerHref: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTraining(formData);
            const customerId = formData.customerHref.split('/').pop();
            const customer = customers.find(customer => customer.id === parseInt(customerId));
            const formattedResponse = formatTrainingResponse(response, customer);
            setTrainings((prevTrainings) => [formattedResponse, ...prevTrainings]);
            handleClose();
            showAlert('Training created successfully', 'success');
        } catch (error) {
            showAlert(error.message, 'error');
        }
    }

    const fields = [
        { label: 'Activity', name: 'activity' },
        { label: 'Duration', name: 'duration' }
    ]

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ minWidth: 120, mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="customer-label">Customer</InputLabel>
                    <Select
                        labelId="customer-label"
                        id="customer"
                        value={formData.customerHref}
                        label="Customer"
                        onChange={handleCustomerChange}
                        required
                    >
                        {customers.map(customer =>
                            <MenuItem key={customer.id} value={formatCustomerHref(customer.id)}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box>
            <DateTimePicker
                label="Date"
                value={dayjs(formData.date)}
                onChange={handleDateChange}
                format='DD/MM/YYYY HH:mm'
                ampm={false}
                sx={{ mb: 2, width: '100%' }}
                required
            />
            <FormFields fields={fields} formData={formData} handleChange={handleChange} />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Create Training
            </Button>
        </form>
    );
}

export default CreateTrainingForm;