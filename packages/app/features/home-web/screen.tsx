import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export function HomeWeb() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        // Here you would typically update your theme context or apply the theme change
    };

    return (
        <div className={`flex-1 justify-center items-center p-10 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>

            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>
            <h4>ádasd</h4>

            <h4>ádasd</h4>
            <h4>ádasd</h4>

            <h4>ádasd</h4><h4>ádasd</h4>
        </div>
    );
}
