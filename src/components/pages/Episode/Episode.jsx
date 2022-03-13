import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getEpisodeSingle } from "actions/episode";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading/Loading";

import styles from "./Episode.scss";
import { Button } from "@mui/material";

const Episode = ({
  loading,
  episode,
  notFound,
  getEpisodeSingle,
  characters
}) => {
  const history = useNavigate();
  const { episodeId } = useParams();

  useLayoutEffect(() => {
    getEpisodeSingle(episodeId);
  }, []);

  useEffect(() => {
    if (notFound) {
      history("/location");
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.Episode}>
        <div className={styles.EpisodeData}>
          <h2>{episode?.name}</h2>
        </div>
        <div className={styles.EpisodeDetails}>
          <strong>Episode:</strong>
          <div>{episode?.episode}</div>
          <strong>Air Date:</strong>
          <Button variant='outlined' color='secondary'>
            {episode?.air_date}
          </Button>
          <strong>Created:</strong>
          <div>{`${new Date(episode?.created).toLocaleDateString()} ${new Date(
            episode?.created
          ).toLocaleTimeString()}`}</div>
        </div>
      </div>
      <div className={styles.EpisodeCharacters}>
        <strong>Characters:</strong>
        <div>
          {characters?.map((el) => {
            const { id, name } = el.data;
            return (
              <Button
                variant='outlined'
                size='small'
                onClick={() => history(`/character/${id}`)}
                key={id}
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.episode.loading,
  episode: state.episode.episode,
  notFound: state.episode.notFound,
  characters: state.episode.characters
});

Episode.propTypes = {
  episode: PropTypes.object,
  characters: PropTypes.array,
  getEpisodeSingle: PropTypes.func,
  loading: PropTypes.bool,
  notFound: PropTypes.bool
};

export default connect(mapStateToProps, { getEpisodeSingle })(Episode);
