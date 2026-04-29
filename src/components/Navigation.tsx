
import {AppBar, Toolbar, Typography, Stack, Button, IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navigation() {
    return(
       
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{px:4}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx = {{flexGrow: 1, fontWeight:600}}>
                    Personal Trainer
                </Typography>
                <Stack direction ="row" spacing={2}>

                    <Button color="inherit" component={Link} to="/">Customer</Button>

                    <Button color="inherit" component={Link} to="/trainings">Trainings</Button>

                    <Button color="inherit" component={Link} to="/calendar">Calendar</Button>

                    <Button color="inherit" component={Link} to="/statistics">Statistics</Button>

                </Stack>


            </Toolbar>
        </AppBar>
        
    )
}