import {
  CHARACTERS_LIST,
  LOADING,
  PAGE,
  NOT_FOUND,
  CHARACTER_SINGLE
} from "actionTypes/character";
import * as api from "api/character";

export const getCharacterList = (filter) => (dispatch) => {
  dispatch({ type: PAGE, page: 1 });
  dispatch({ type: LOADING, loading: true });
  return api.charactersFilter(filter, 1).then((data) => {
    dispatch({
      type: CHARACTERS_LIST,
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

export const getCharacterListFilter = (filter, page) => (dispatch) => {
  dispatch({ type: PAGE, page: page });
  dispatch({ type: LOADING, loading: true });
  return api
    .charactersFilter(filter, page)
    .then((data) => {
      dispatch({
        type: CHARACTERS_LIST,
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
        .charactersFilter(filter, 1)
        .then((data) => {
          dispatch({ type: PAGE, page: 1 });
          dispatch({
            type: CHARACTERS_LIST,
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

export const getCharacterSingle = (id) => (dispatch) => {
  dispatch({ type: LOADING, loading: true });
  return api
    .characterSingle(id)
    .then((data) => {
      dispatch({
        type: CHARACTER_SINGLE,
        data
      });
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
