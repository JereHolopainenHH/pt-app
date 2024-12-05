import CustomTextField from "./CustomTextField";

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