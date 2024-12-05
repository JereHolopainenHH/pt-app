import { TextField } from '@mui/material';

/**
 * CustomTextField component for rendering a text field with custom props.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {string} props.name - The name of the text field.
 * @param {string} props.value - The value of the text field.
 * @param {Function} props.onChange - Function to handle input changes.
 * @param {boolean} [props.required=true] - Boolean indicating whether the field is required.
 * @returns {JSX.Element} The CustomTextField component.
 */
export default function CustomTextField({ label, name, value, onChange, required = true }) {
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