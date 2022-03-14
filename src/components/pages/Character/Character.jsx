import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getCharacterSingle } from "actions/character";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading/Loading";

import styles from "./Character.scss";
import { Button } from "@mui/material";

const Character = ({ character, getCharacterSingle, loading, notFound }) => {
  const history = useNavigate();
  const { charId } = useParams();

  const locationString = (c, s) => {
    const res = s
      .split("")
      .reduce((a, e, i) => (e === c ? a.concat(i) : a), []);
    let lastIndex = res.slice(-1);
    return s.slice(lastIndex);
  };

  const prevLocationString = (c, s) => {
    const res = s
      .split("")
      .reduce((a, e, i) => (e === c ? a.concat(i) : a), []);
    let lastIndex = res?.slice(-1);
    return s.slice(lastIndex);
  };

  useEffect(() => {
    getCharacterSingle(charId);
  }, []);

  useEffect(() => {
    if (notFound) {
      history("/character");
    }
  }, [notFound]);

  const statusCharacter = (status) => {
    switch (status && status.toLowerCase()) {
      case "alive":
        return styles.CharacterAlive;
      case "dead":
        return styles.CharacterDead;
      default:
        return styles.CharacterUnknown;
    }
  };

  const statusCharacterButton = (status) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "success";
      case "dead":
        return "warning";
      default:
        return "secondary";
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.Character}>
      <div className={styles.CharacterData}>
        <img
          src={character.image}
          alt={character.name}
          className={statusCharacter(character.status)}
        />
        <h2>{character.name}</h2>
      </div>
      <div className={styles.CharacterDetails}>
        <h2>Details</h2>
        <div className={styles.DividerDiv}>
          <strong>Status:</strong>
          <div>
            <Button
              variant='outlined'
              color={statusCharacterButton(character.status)}
              size='small'
            >
              {character.status}
            </Button>
          </div>
          <strong>Created:</strong>
          <div>
            {`${new Date(character?.created).toLocaleDateString()} ${new Date(
              character?.created
            ).toLocaleTimeString()}`}
          </div>
          <strong>Gender:</strong>
          <div>{character?.gender}</div>
          <strong>Origin:</strong>
          <div>
            <Button
              onClick={() =>
                history(
                  `/location${prevLocationString("/", character?.origin.url)}`
                )
              }
              variant='outlined'
            >
              {character?.origin?.name}
            </Button>
          </div>
          <strong>Location:</strong>
          <div>
            <Button
              onClick={() =>
                history(
                  `/location${prevLocationString("/", character?.location.url)}`
                )
              }
              variant='outlined'
            >
              {character?.location?.name}
            </Button>
          </div>
          <strong>Species:</strong>
          <div>{character?.species}</div>
          <strong>Type:</strong>
          <div>{character?.type ? character.type : "-"}</div>
          <strong>Episode:</strong>
          <div>
            {character?.episode?.map((el, i) => {
              return (
                <Button
                  onClick={() =>
                    history(`/episode/${locationString("/", el).substr(1)}`)
                  }
                  key={i}
                >
                  {locationString("/", el).substr(1)}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Character.propTypes = {
  character: PropTypes.object,
  getCharacterSingle: PropTypes.func,
  loading: PropTypes.bool,
  notFound: PropTypes.bool
};

const mapStateToProps = (state) => ({
  character: state.character.character,
  loading: state.character.loading,
  notFound: state.character.notFound
});

export default connect(mapStateToProps, { getCharacterSingle })(Character);
