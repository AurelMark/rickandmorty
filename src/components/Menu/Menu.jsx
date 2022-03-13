import React, { useState } from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate } from "react-router-dom";

import styles from "./Menu.scss";
import { connect } from "react-redux";

import { nameModule } from "actions/system";

const Menu = ({ nameModule }) => {
  const [links] = useState([
    {
      title: "Dashboard",
      icon: <HomeIcon className={styles.iconColor} />,
      redirect: "/dashboard"
    },
    {
      title: "Character",
      icon: <PeopleAltIcon className={styles.iconColor} />,
      redirect: "/character"
    },
    {
      title: "Location",
      icon: <FmdGoodIcon className={styles.iconColor} />,
      redirect: "/location"
    },
    {
      title: "Episode",
      icon: <LocalMoviesIcon className={styles.iconColor} />,
      redirect: "/episode"
    },
    {
      title: "About",
      icon: <InfoIcon className={styles.iconColor} />,
      redirect: "/about"
    }
  ]);

  const history = useNavigate();

  const redirectToMaterial = (el) => {
    history(el.redirect);
    nameModule(el.title);
  };

  return (
    <List>
      {links.map((el) => (
        <ListItem
          onClick={() => redirectToMaterial(el)}
          className={styles.listHover}
          button
          key={el.title}
        >
          <ListItemIcon>{el.icon}</ListItemIcon>
          <ListItemText primary={el.title} />
        </ListItem>
      ))}
    </List>
  );
};

Menu.propTypes = {
  nameModule: PropTypes.func
};

export default connect(null, { nameModule })(Menu);
