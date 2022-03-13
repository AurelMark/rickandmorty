import { OPEN_MENU, NAME_MODULE, LOADING } from "actionTypes/system";

export const toggleMenu = () => (dispatch) =>
  dispatch({
    type: OPEN_MENU
  });

export const nameModule = (names) => (dispatch) =>
  dispatch({
    type: NAME_MODULE,
    names
  });

export const numLoading = (num) => (dispatch) =>
  dispatch({
    type: LOADING,
    num
  });
