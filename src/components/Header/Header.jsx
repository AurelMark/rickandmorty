import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logo from "images/logos.svg";
import { useLocation } from "react-router-dom";

import Menu from "components/Menu/Menu";

import styles from "./Header.scss";
import { connect } from "react-redux";

import { toggleMenu } from "actions/system";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between"
}));

const Header = ({ open, toggleMenu, names }) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const [title, setTitle] = useState("");

  const locationString = (c, s) => {
    const res = s
      .split("")
      .reduce((a, e, i) => (e === c ? a.concat(i) : a), []);
    return res.length > 0 ? s.slice(0, res) : s;
  };

  useEffect(() => {
    if (names == "") {
      const editedTitle = pathname.substr(1);
      setTitle(locationString("/", editedTitle));
    } else {
      setTitle(names);
    }
  }, [names]);

  return (
    <>
      <AppBar position='fixed' open={open} className={styles.AppBarColor}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleMenu}
            edge='start'
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, textTransform: "capitalize" }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <img src={logo} className={styles.imgLogo} />
          <IconButton onClick={toggleMenu}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Divider />
        <Menu />
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  open: state.system.open,
  names: state.system.names
});

Header.propTypes = {
  open: PropTypes.bool,
  toggleMenu: PropTypes.func,
  names: PropTypes.string
};

export default connect(mapStateToProps, { toggleMenu })(Header);
