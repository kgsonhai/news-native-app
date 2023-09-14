import { CATEGORIES } from "../../components/Category/category.constant";
import { SET_CURRENT_CATEGORY } from "../action/categoryAction";
import { CHANGE_LANGUAGE } from "../action/localeAction";

const initialState = {
  preLanguage: "vi",
  language: "vi",
};

const localesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        preLanguage: state.language,
        language: action.payload,
      };
    default:
      return state;
  }
};
export default localesReducer;
