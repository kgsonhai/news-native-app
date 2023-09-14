export const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";

export const setCurrentCategory = (category) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_CATEGORY, payload: category });
};
