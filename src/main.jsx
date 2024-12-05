import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fi'; // Import Finnish locale
import AlertProvider from './components/AlertProvider.jsx';
import App from './App.jsx';

// Set the locale globally
dayjs.locale('fi');

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
    <AlertProvider>
      <Router>
        <StrictMode>
          <App />
        </StrictMode>
      </Router>
    </AlertProvider>
  </LocalizationProvider>
);