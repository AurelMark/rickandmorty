import {
  GET_LOCATIONS,
  LOADING,
  PAGE,
  NOT_FOUND,
  LOCATION_SINGLE,
  GET_MULTIPLE_CHARACTER
} from "actionTypes/location";
import * as api from "api/location";
import axios from "axios";

export const getLocations = (filter) => (dispatch) => {
  dispatch({ type: PAGE, page: 1 });
  dispatch({ type: LOADING, loading: true });
  return api.getLocations(filter, 1).then((data) => {
    dispatch({
      type: GET_LOCATIONS,
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

export const getLocationsFilter = (filter, page) => (dispatch) => {
  dispatch({ type: PAGE, page: page });
  dispatch({ type: LOADING, loading: true });
  return api
    .getLocations(filter, page)
    .then((data) => {
      dispatch({
        type: GET_LOCATIONS,
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
        .getLocations(filter, 1)
        .then((data) => {
          dispatch({ type: PAGE, page: 1 });
          dispatch({
            type: GET_LOCATIONS,
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

export const getLocationSingle = (id) => (dispatch) => {
  dispatch({ type: LOADING, loading: true });
  return api
    .locationSingle(id)
    .then((data) => {
      dispatch({
        type: LOCATION_SINGLE,
        data
      });
      const urls = data.residents;

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
