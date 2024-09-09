import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function HomeWeb() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className="flex-1">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Home Web
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <div
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <p>Drawer Content</p>
                </div>
            </Drawer>
            <div className="flex-1 justify-center items-center p-10">
                <h4>ádasd</h4>
            </div>
        </div>
    );
}
