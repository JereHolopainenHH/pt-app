import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="/">
                        Personal Trainer App
                    </Button>
                </Typography>
                <Button color="inherit" component={Link} to="/customers">
                    Customers
                </Button>
                <Button color="inherit" component={Link} to="/trainings">
                    Trainings
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
