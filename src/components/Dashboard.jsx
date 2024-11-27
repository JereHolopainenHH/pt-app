// material ui imports
import { Typography, Button } from "@mui/material";

// api function imports
import { resetDatabase } from "../api/reset";

function Dashboard() {
    return (
        <div>
            <Typography variant="h4">Dashboard</Typography>
            <Button variant="contained" color="error" onClick={resetDatabase}>Reset Database</Button>
        </div>
    )
}

export default Dashboard;