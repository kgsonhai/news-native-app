import { CATEGORIES } from "../../components/Category/category.constant";
import { SET_CURRENT_CATEGORY } from "../action/categoryAction";

const initialState = {
  currentCategory: CATEGORIES[0],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    default:
      return state;
  }
};
export default categoryReducer;
