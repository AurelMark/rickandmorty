import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styles from "./Cards.scss";

const Cards = ({ item }) => {
  const statusCharacter = (status) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "success";
      case "dead":
        return "warning";
      default:
        return "secondary";
    }
  };

  const history = useNavigate();

  const redirectCharacter = (id) => {
    history(`/character/${id}`);
  };

  const prevLocationString = (c, s) => {
    const res = s
      .split("")
      .reduce((a, e, i) => (e === c ? a.concat(i) : a), []);
    let lastIndex = res?.slice(-1);
    return s.slice(lastIndex);
  };

  return (
    <div className={styles.Cards}>
      <Card>
        <CardActionArea onClick={() => redirectCharacter(item.id)}>
          <CardMedia component='img' alt={item.name} image={item.image} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {item.name}
          </Typography>
          <div>
            <div>
              <strong>Location</strong>:{" "}
              <Button
                onClick={() =>
                  history(
                    `/location${prevLocationString("/", item?.location.url)}`
                  )
                }
                size='small'
              >
                {item.location.name}
              </Button>
            </div>
            <div>
              <strong>Status</strong>:{" "}
              <Button
                size='small'
                variant='outlined'
                color={statusCharacter(item.status)}
              >
                {item.status}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Cards.propTypes = {
  item: PropTypes.object
};

export default Cards;
