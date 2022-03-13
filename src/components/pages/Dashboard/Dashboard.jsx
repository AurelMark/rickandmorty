import React from "react";
import location from "images/location.gif";
import episode from "images/episode.gif";
import character from "images/characters.gif";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

import styles from "./Dashboard.scss";

const Dashboard = () => {
  const history = useNavigate();
  return (
    <>
      <h2 className={styles.DashboardTitle}>Dashboard</h2>
      <div className={styles.Dashboard}>
        <Card className={styles.DashboardImage}>
          <CardActionArea onClick={() => history("/character")}>
            <CardMedia component='img' image={character} alt='Characters' />
            <div className={styles.DashboardImageTitle}>Character</div>
          </CardActionArea>
        </Card>
        <Card className={styles.DashboardImage}>
          <CardActionArea onClick={() => history("/location")}>
            <CardMedia component='img' image={location} alt='Locations' />
            <div className={styles.DashboardImageTitle}>Location</div>
          </CardActionArea>
        </Card>
        <Card className={styles.DashboardImage}>
          <CardActionArea onClick={() => history("/Episode")}>
            <CardMedia component='img' image={episode} alt='Episodes' />
            <div className={styles.DashboardImageTitle}>Episode</div>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
