import { apiClient, client } from "../../api";
import { CATEGORIES } from "../../components/Category/category.constant";

export const GET_NEWS_FEED_REQUEST = "GET_NEWS_FEED_REQUEST";
export const GET_NEWS_FEED_SUCCESS = "GET_NEWS_FEED_SUCCESS";
export const SEARCH_NEWS = "SEARCH_NEWS";
export const RESET_SEARCH_RESULTS = "RESET_SEARCH_RESULTS";

// export const getNewsFeed =
//   (setIsLoading, category = NewsCategory.business) =>
//   async (dispatch) => {
//     try {
//       setIsLoading(true);
//       const res = await apiClient.get(
//         `top-headlines?language=en&category=${category}`
//       );
//       setIsLoading(false);
//       if (res.status === 200) {
//         dispatch({
//           type: GET_NEWS_FEED,
//           payload: res?.data?.articles,
//         });
//       } else {
//         console.warn("Something went wrong");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

export const getNewsFeed =
  (category = CATEGORIES[0]) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_NEWS_FEED_REQUEST });
      const res = await client.get(`/api/common/article/name/${category}`);
      setTimeout(async () => {
        dispatch({
          type: GET_NEWS_FEED_SUCCESS,
          payload: res,
        });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

export const searchNews = (result) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_NEWS,
      payload: result,
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetSearchResults = () => (dispatch) => {
  dispatch({
    type: RESET_SEARCH_RESULTS,
  });
};
