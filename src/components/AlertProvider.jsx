import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Create context to manage the alert state
const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

function AlertProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success'); // 'success' or 'error'

    const showAlert = useCallback((message, severity = 'success') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }, []);

    const handleCloseAlert = () => {
        setOpen(false);
        setMessage('');
        setSeverity('success');
    };

    const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

export default AlertProvider;