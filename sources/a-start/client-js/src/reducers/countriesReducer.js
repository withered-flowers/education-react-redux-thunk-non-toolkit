import {
  COUNTRIES_PENDING,
  COUNTRIES_REJECT,
  COUNTRIES_SUCCESS,
} from "../actions/type";

const initialState = {
  isLoading: true,
  countries: [],
  errorMsg: "",
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_PENDING:
      return {
        ...state,
        isLoading: true,
        countries: [],
        errorMsg: "",
      };

    case COUNTRIES_REJECT:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };

    case COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
      };

    default:
      return state;
  }
};

export default countriesReducer;
