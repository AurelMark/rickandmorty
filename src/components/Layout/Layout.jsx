import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "components/Header/Header";
import Content from "components/Content/Content";
import { connect } from "react-redux";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between"
}));

const Layout = ({ open, children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Main open={open}>
        <DrawerHeader />
        <Content>{children}</Content>
      </Main>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  open: state.system.open,
  reLink: state.system.redirectLink
});

Layout.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.object,
  reLink: PropTypes.string
};

export default connect(mapStateToProps, {})(Layout);
