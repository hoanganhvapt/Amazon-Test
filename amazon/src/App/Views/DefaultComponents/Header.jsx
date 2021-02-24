import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    MenuItem,
    Menu,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(false);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar className="grow" position="static">
                <Toolbar className="flex">
                    <Link className="flex" to="/">
                        <IconButton edge="start" className="logo" aria-label="open drawer">
                            <FontAwesomeIcon icon={["fab", "amazon"]} />
                        </IconButton>
                        <Typography variant="h5" noWrap>
                            Amazon
                        </Typography>
                    </Link>
                    <div className="search">
                        <div className="search-icon">
                            <SearchIcon color="primary" />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className="search-input"
                            inputProps={{ "aria-label": "search" }}
                            type="search"
                        />
                    </div>
                    <div className="session">
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle fontSize="large" />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    );
};

export default Header;
