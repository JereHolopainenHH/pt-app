import { TextField } from '@mui/material';

function CustomTextField({ label, name, value, onChange, required = true }) {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            sx={{ mb: 2 }}
            required={required}
        />
    );
}

export default CustomTextField;