import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Collapse,
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = (props) => {
    const [selectedIndex, setSelectedIndex] = useState({
        parentId: 1,
        childId: 0,
    });

    const [listMenu, setListMenu] = useState([
        {
            id: 0,
            url: "/",
            icon: "home",
            title: "Home",
        },
        {
            id: 1,
            url: "#",
            icon: "download",
            title: "Orders",
            open: false,
            child: [
                {
                    id: 0,
                    url: "/order",
                    icon: "FiberManualRecordIcon",
                    title: "Orders",
                    parentId: 1,
                },
                {
                    id: 1,
                    url: "/draft",
                    icon: "FiberManualRecordIcon",
                    title: "Drafts",
                    parentId: 1,
                },
            ],
        },
        {
            id: 2,
            url: "#",
            icon: "tags",
            title: "Products",
            open: false,
            child: [
                {
                    id: 0,
                    url: "/product",
                    icon: "FiberManualRecordIcon",
                    title: "List Product",
                    parentId: 2,
                },
                {
                    id: 1,
                    url: "/category",
                    icon: "FiberManualRecordIcon",
                    title: "Category",
                    parentId: 2,
                },
            ],
        },
        {
            id: 3,
            url: "/customer",
            icon: "user",
            title: "Customers",
        },
    ]);

    useEffect(() => {
        console.log(props.location);
        handleSelectedItem(props.location);
    }, [props.location]);

    const handleSelectedItem = (location) => {
        if (location === "/") return handleListItemSelect(0, null, "parent");
        let menu = listMenu.filter((item) => item.url === location);
        if (menu.length > 0)
            return menu.map((item) => handleListItemSelect(item.id, null, "parent"));
        menu = listMenu.filter((item) => item.child);
        return menu.map((item) =>
            item.child.map((item) =>
                item.url === location
                    ? handleListItemSelect(item.id, item.parentId, "child") &
                      setListMenu(
                          listMenu.map((i) =>
                              i.id === item.parentId ? { ...i, open: !i.open } : i
                          )
                      )
                    : item
            )
        );
    };

    const handleOpenChildMenu = (id) => {
        setListMenu(
            listMenu.map((item) => (item.id === id.parentId ? { ...item, open: !item.open } : item))
        );
    };

    const handleClickChildMenu = (id) => {
        setListMenu(
            listMenu.map((item) => (item.id === id ? { ...item, open: !item.open } : item))
        );
    };

    const handleListItemSelect = (index, pIndex, caseName) => {
        if (caseName === "parent") return setSelectedIndex({ parentId: index, childId: null });
        return setSelectedIndex({ parentId: pIndex, childId: index });
    };
    console.log(selectedIndex, listMenu);
    return (
        <List component="nav" className="menu">
            <ListItem>
                <Typography variant="h6" component="label" color="primary" className="menu-title">
                    General
                </Typography>
            </ListItem>
            {listMenu.map((item) =>
                !item.child ? (
                    <Link key={item.id} className="router-menu" to={item.url}>
                        <ListItem
                            button
                            selected={selectedIndex.parentId === item.id}
                            onClick={(event) => handleListItemSelect(item.id, null, "parent")}
                        >
                            <ListItemIcon className="icon">
                                <FontAwesomeIcon icon={["fas", item.icon]} />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </Link>
                ) : (
                    <div key={item.id}>
                        <ListItem
                            button
                            onClick={(event) => handleClickChildMenu(item.id)}
                            className="router-menu"
                        >
                            <ListItemIcon className="icon">
                                <FontAwesomeIcon icon={["fas", item.icon]} />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                            {item.open ? (
                                <ExpandMore className="arrow-icon-reverse" />
                            ) : (
                                <ExpandMore className="arrow-icon" />
                            )}
                        </ListItem>
                        <Collapse in={item.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.child.map((item) => (
                                    <Link key={item.id} to={item.url} className="router-menu">
                                        <ListItem
                                            button
                                            className="nested"
                                            selected={
                                                selectedIndex.childId === item.id &&
                                                selectedIndex.parentId === item.parentId
                                            }
                                            onClick={(event) =>
                                                handleListItemSelect(
                                                    item.id,
                                                    item.parentId,
                                                    "child"
                                                )
                                            }
                                        >
                                            <ListItemIcon className="icon">
                                                <FiberManualRecordOutlinedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                )
            )}
        </List>
    );
};

export default Menu;
