import {
  GET_EPISODES,
  LOADING,
  PAGE,
  NOT_FOUND,
  EPISODE_SINGLE,
  GET_MULTIPLE_CHARACTER
} from "actionTypes/episode";
import * as api from "api/episode";
import axios from "axios";

export const getEpisodes = (filter) => (dispatch) => {
  dispatch({ type: PAGE, page: 1 });
  dispatch({ type: LOADING, loading: true });
  return api.getEpisodes(filter, 1).then((data) => {
    dispatch({
      type: GET_EPISODES,
      data
    });
    setTimeout(() => {
      dispatch({
        type: LOADING,
        loading: false
      });
    }, 750);
  });
};

export const getEpisodesFilter = (filter, page) => (dispatch) => {
  dispatch({ type: PAGE, page: page });
  dispatch({ type: LOADING, loading: true });
  return api
    .getEpisodes(filter, page)
    .then((data) => {
      dispatch({
        type: GET_EPISODES,
        data
      });
      setTimeout(() => {
        dispatch({
          type: LOADING,
          loading: false
        });
      }, 750);
    })
    .catch(() => {
      return api
        .getEpisodes(filter, 1)
        .then((data) => {
          dispatch({ type: PAGE, page: 1 });
          dispatch({
            type: GET_EPISODES,
            data
          });
          setTimeout(() => {
            dispatch({
              type: LOADING,
              loading: false
            });
          }, 750);
        })
        .catch(() => {
          dispatch({ type: NOT_FOUND, notFound: true });
          dispatch({ type: LOADING, loading: false });
        });
    });
};

export const getEpisodeSingle = (id) => (dispatch) => {
  dispatch({ type: LOADING, loading: true });
  return api
    .episodeSingle(id)
    .then((data) => {
      dispatch({
        type: EPISODE_SINGLE,
        data
      });
      const urls = data.characters;

      const fetchData = (url) => {
        return axios.get(url).then((res) => ({
          data: res.data
        }));
      };

      const getAllData = (urls) => {
        return Promise.all(urls.map(fetchData));
      };

      getAllData(urls)
        .then((resp) => {
          dispatch({
            type: GET_MULTIPLE_CHARACTER,
            data: resp
          });
        })
        .catch(() => {
          getAllData(urls)
            .then((resp) => {
              dispatch({
                type: GET_MULTIPLE_CHARACTER,
                data: resp
              });
            })
            .catch((err) => {
              console.log("err", err);
            });
        });
    })
    .then(() => {
      dispatch({
        type: LOADING,
        loading: false
      });
    })
    .catch(() => {
      dispatch({ type: NOT_FOUND, notFound: true });
      dispatch({ type: LOADING, loading: false });
    });
};
