import CustomTextField from "./CustomTextField";

/**
 * FormFields component for rendering a list of custom text fields.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.fields - Array of field definitions.
 * @param {Object} props.formData - Object containing form data.
 * @param {Function} props.handleChange - Function to handle input changes.
 * @returns {JSX.Element} The FormFields component.
 */
export default function FormFields({ fields, formData, handleChange }) {
    return fields.map((field) => (
        <CustomTextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            value={formData[field.name]}
            onChange={handleChange}
        />
    ))
}