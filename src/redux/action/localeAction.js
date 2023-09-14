export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const dispatchChangeLanguage = (language) => async (dispatch) => {
  dispatch({ type: CHANGE_LANGUAGE, payload: language });
};
