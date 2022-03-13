import { OPEN_MENU, NAME_MODULE, LOADING } from "actionTypes/system";

const INITIAL_STATE = {
  open: window.innerWidth > 1200 ? true : false,
  names: "",
  num: 0
};

const systemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MENU: {
      return { ...state, open: !state.open };
    }
    case NAME_MODULE: {
      return { ...state, names: action.names };
    }
    case LOADING: {
      return { ...state, num: action.num };
    }
    default:
      return state;
  }
};

export default systemReducer;
