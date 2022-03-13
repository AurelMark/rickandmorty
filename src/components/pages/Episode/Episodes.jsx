import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getEpisodes, getEpisodesFilter } from "actions/episode";
import Loading from "components/Loading/Loading";

import styles from "./Episodes.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import classNames from "classnames";
import fuck from "images/fuck2.png";
import { useNavigate } from "react-router-dom";

const Episodes = ({
  getEpisodes,
  getEpisodesFilter,
  loading,
  notFound,
  episodes,
  pages,
  total
}) => {
  const history = useNavigate();
  useEffect(() => {
    getEpisodes();
  }, []);

  const [page, setPage] = useState(pages);
  const [filter, setFilter] = useState({
    name: "",
    episode: ""
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFilter((oldValue) => ({
      ...oldValue,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    getEpisodesFilter(filter, Number(e.target.textContent));
  };

  const handlePage = (event) => {
    setPage(event.target.value);
    getEpisodesFilter(filter, event.target.value);
  };

  useEffect(() => {
    setPage(pages);
  }, [pages]);

  const showTotalEl = (total) => {
    return Array.from(Array(total)).map((_, i) => (
      <MenuItem key={i + 1} value={i + 1}>
        {i + 1}
      </MenuItem>
    ));
  };

  const searchEpisodes = () => {
    getEpisodesFilter(filter, 1);
  };

  const redirectToEpisode = (id) => {
    history(`/episode/${id}`);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.EpisodesFilter}>
        {!notFound && (
          <FormControl fullWidth>
            <InputLabel id='page'>Page</InputLabel>
            <Select
              labelId='page'
              id='page'
              value={page}
              label='Page'
              onChange={handlePage}
            >
              {showTotalEl(total)}
            </Select>
          </FormControl>
        )}
        <TextField
          onChange={handleInputs}
          name='name'
          value={filter.name}
          label='Name'
          variant='outlined'
        />
        <TextField
          onChange={handleInputs}
          name='episode'
          value={filter.episode}
          label='Episode'
          variant='outlined'
        />
        <div className={styles.EpisodesSubmit}>
          <Button onClick={searchEpisodes} variant='contained' size='large'>
            Search
          </Button>
        </div>
      </div>
      <div className={classNames({ [`${styles.Episodes}`]: !notFound })}>
        {notFound ? (
          <div className={styles.EpisodesImage}>
            <h3 className={styles.EpisodesText}>Try again...</h3>
            <img src={fuck} />
          </div>
        ) : (
          episodes &&
          episodes.map((el) => (
            <Card key={el.id} className={styles.EpisodesItem}>
              <CardContent>
                <h2>{el.name}</h2>
                <span>{el.episode}</span>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size='large' onClick={() => redirectToEpisode(el.id)}>
                  More
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>

      {!notFound && (
        <div className={styles.EpisodesPagination}>
          <Stack spacing={2}>
            <Pagination
              onChange={handleChange}
              count={total}
              color='primary'
              defaultPage={pages || 1}
              showFirstButton={false}
              showLastButton={false}
              boundaryCount={2}
              hideNextButton
              hidePrevButton
            />
          </Stack>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  episodes: state.episode.episodes,
  notFound: state.episode.notFound,
  pages: state.episode.pages,
  loading: state.episode.loading,
  total: state.episode.total
});

Episodes.propTypes = {
  episodes: PropTypes.array,
  getEpisodes: PropTypes.func,
  getEpisodesFilter: PropTypes.func,
  loading: PropTypes.bool,
  pages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.number,
  notFound: PropTypes.bool
};

export default connect(mapStateToProps, { getEpisodes, getEpisodesFilter })(
  Episodes
);
