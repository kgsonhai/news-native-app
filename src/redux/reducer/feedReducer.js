import {
  GET_NEWS_FEED_REQUEST,
  GET_NEWS_FEED_SUCCESS,
  RESET_SEARCH_RESULTS,
  SEARCH_NEWS,
} from "../action/feedAction";

const initialState = {
  isShowPlay: false,
  isLoading: true,
  newsFeed: [],
  searchResults: [],
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_FEED_REQUEST:
      return { ...state, isLoading: true };
    case GET_NEWS_FEED_SUCCESS:
      return {
        ...state,
        newsFeed: action.payload,
        isShowPlay: true,
        isLoading: false,
      };
    case SEARCH_NEWS: {
      return { ...state, searchResults: action.payload };
    }
    case RESET_SEARCH_RESULTS:
      return { ...state, searchResults: [] };
    default:
      return state;
  }
};
export default feedReducer;
