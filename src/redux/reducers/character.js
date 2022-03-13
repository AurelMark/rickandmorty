import {
  CHARACTERS_LIST,
  LOADING,
  PAGE,
  NOT_FOUND,
  CHARACTER_SINGLE
} from "actionTypes/character";

const INITIAL_STATE = {
  characters: [],
  character: {},
  loading: false,
  pages: "",
  total: 0,
  notFound: false
};

const characterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE: {
      return { ...state, pages: action.page, notFound: false };
    }
    case CHARACTERS_LIST: {
      return {
        ...state,
        characters: action.data.results,
        total: action.data.info.pages,
        notFound: false,
        character: {}
      };
    }

    case NOT_FOUND: {
      return { ...state, notFound: action.notFound };
    }

    case LOADING: {
      return { ...state, loading: action.loading };
    }
    case CHARACTER_SINGLE: {
      return { ...state, character: action.data };
    }
    default:
      return state;
  }
};

export default characterReducer;
