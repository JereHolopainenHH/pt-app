import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTraining } from '../api/trainings';
import { useAlert } from './AlertProvider';
import { formatTrainingResponse } from '../utils/formatTrainingResponse';
import FormFields from './FormFields';
import { getIdFromHref } from '../utils/getIdFromHref';
import { getCustomerHref } from '../utils/getCustomerHref';

function CreateTrainingForm({ handleClose, setTrainings, customers }) {
    const { showAlert } = useAlert();
    const [selectCustomers, setSelectCustomers] = useState([]);
    const [formData, setFormData] = useState({
        date: dayjs(new Date()).toISOString(),
        activity: '',
        duration: '',
        customer: ''
    });

    useEffect(() => {
        if (customers.length > 0) {
            setSelectCustomers(customers);
            setFormData((prev) => ({
                ...prev,
                customer: getCustomerHref(customers[0])
            }));
        }
    }, [customers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, date: newValue.toISOString() }));
    }

    const handleCustomerChange = (e) => {
        setFormData(prev => ({ ...prev, customer: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTraining(formData);
            const responseCustomer = customers.find(customer => getIdFromHref(getCustomerHref(customer)) === getIdFromHref(formData.customer));
            const formattedResponse = formatTrainingResponse(response, responseCustomer);
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
        <form onSubmit={handleSubmit} autoComplete='off'>
            <Box sx={{ minWidth: 120, mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="customer-label">Customer</InputLabel>
                    <Select
                        labelId="customer-label"
                        id="customer"
                        value={formData.customer}
                        label="Customer"
                        onChange={handleCustomerChange}
                        required
                    >
                        {selectCustomers.map(customer =>
                            <MenuItem key={getCustomerHref(customer)} value={getCustomerHref(customer)}>
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