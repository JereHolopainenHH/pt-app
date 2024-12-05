import { 
    createContext, 
    useContext, 
    useState, 
    useMemo, 
    useCallback 
} from 'react';
import { Snackbar, Alert } from '@mui/material';

// Create context to manage the alert state
const AlertContext = createContext();

/**
 * Custom hook to use the Alert context.
 *
 * @returns {Object} The context value containing the showAlert function.
 */
export const useAlert = () => {
    return useContext(AlertContext);
};

/**
 * AlertProvider component to provide alert context to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components that will have access to the alert context.
 * @returns {JSX.Element} The AlertProvider component.
 */
export default function AlertProvider({ children }) {
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