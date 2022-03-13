import React from "react";
import notFound from "images/notFound.png";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import styles from "./NotFound.scss";

const NotFound = () => {
  const history = useNavigate();

  const redirectToMaterial = () => history("/");

  return (
    <div className={styles.NotFound}>
      <div className={styles.NotFoundBlock}>
        <img src={notFound} className={styles.NotFoundImg} />
        <h2 className={styles.NotFoundTitle}>404 Not Found</h2>
      </div>
      <div className={styles.NotFoundButton}>
        <Button variant='outlined' size='large' onClick={redirectToMaterial}>
          Go to main page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
