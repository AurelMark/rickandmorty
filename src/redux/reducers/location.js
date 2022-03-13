import {
  GET_LOCATIONS,
  LOADING,
  PAGE,
  NOT_FOUND,
  LOCATION_SINGLE,
  GET_MULTIPLE_CHARACTER
} from "actionTypes/location";

const INITIAL_STATE = {
  locations: [],
  location: {},
  loading: false,
  pages: "",
  total: 0,
  notFound: false
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE: {
      return { ...state, pages: action.page, notFound: false };
    }
    case GET_LOCATIONS: {
      return {
        ...state,
        locations: action.data.results,
        total: action.data.info.pages,
        notFound: false,
        location: {}
      };
    }

    case NOT_FOUND: {
      return { ...state, notFound: action.notFound };
    }

    case LOADING: {
      return { ...state, loading: action.loading };
    }
    case LOCATION_SINGLE: {
      return { ...state, location: action.data };
    }
    case GET_MULTIPLE_CHARACTER: {
      return { ...state, characters: action.data };
    }
    default:
      return state;
  }
};

export default locationReducer;
