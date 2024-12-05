import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { TextField, Button, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTraining } from '../api/trainings';
import { useAlert } from './AlertProvider';
import { getUniqueCustomersFromTrainings } from '../utils/trainingUtils';
import { formatCustomerHref, formatTrainingResponse } from '../utils/trainingUtils';
import CustomTextField from './CustomTextField';

function CreateTrainingForm({ handleClose, setTrainings, trainings }) {
    const { showAlert } = useAlert();
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({
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
                setTraining((prevTraining) => ({
                    ...prevTraining,
                    customerHref: formatCustomerHref(uniqueCustomers[0].id)
                }));
            }
        };
        fetchCustomers();
    }, [trainings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTraining({ ...training, [name]: value });
    }

    const handleDateChange = (newValue) => {
        setTraining({ ...training, date: newValue.toIsoString() });
    }

    const handleCustomerChange = (e) => {
        setTraining({ ...training, customerHref: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTraining(training);
            const customerId = training.customerHref.split('/').pop();
            const customer = customers.find(customer => customer.id === parseInt(customerId));
            const formattedResponse = formatTrainingResponse(response, customer);
            setTrainings((prevTrainings) => [...prevTrainings, formattedResponse]);
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
                        value={training.customerHref}
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
                value={dayjs(training.date)}
                onChange={handleDateChange}
                format='DD/MM/YYYY HH:mm'
                ampm={false}
                sx={{ mb: 2, width: '100%' }}
                required
            />
            {
                fields.map((field) => (
                    <CustomTextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={training[field.name]}
                        onChange={handleChange}
                        required
                    />
                ))
            }
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