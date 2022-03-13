import {
  GET_EPISODES,
  LOADING,
  PAGE,
  NOT_FOUND,
  EPISODE_SINGLE,
  GET_MULTIPLE_CHARACTER
} from "actionTypes/episode";

const INITIAL_STATE = {
  episodes: [],
  episode: {},
  loading: false,
  pages: "",
  total: 0,
  notFound: false
};

const episodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE: {
      return { ...state, pages: action.page, notFound: false };
    }
    case GET_EPISODES: {
      return {
        ...state,
        episodes: action.data.results,
        total: action.data.info.pages,
        notFound: false,
        episode: {}
      };
    }

    case NOT_FOUND: {
      return { ...state, notFound: action.notFound };
    }

    case LOADING: {
      return { ...state, loading: action.loading };
    }
    case EPISODE_SINGLE: {
      return { ...state, episode: action.data };
    }
    case GET_MULTIPLE_CHARACTER: {
      return { ...state, characters: action.data };
    }
    default:
      return state;
  }
};

export default episodeReducer;
