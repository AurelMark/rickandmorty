import React from "react";

import logo from "images/logo.png";
import styles from "./Homepage.scss";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const history = useNavigate();

  const redirectToMaterial = () => history("/dashboard");

  return (
    <div className={styles.Homepage}>
      <img src={logo} alt='logo' />
      <Button size='large' onClick={redirectToMaterial} variant='contained'>
        Browse data
      </Button>
    </div>
  );
};

export default Homepage;
