import { AnyAction } from "redux";
import {
  COUNTRIES_PENDING,
  COUNTRIES_REJECT,
  COUNTRIES_SUCCESS,
} from "../actions/type";

export type Country = {
  name: {
    official: string;
  };
  latlng: number[];
};

interface CountriesState {
  isLoading: boolean;
  countries: Country[];
  errorMsg: Error | string;
}

const initialState: CountriesState = {
  isLoading: true,
  countries: [],
  errorMsg: "",
};

const countriesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case COUNTRIES_PENDING:
      return {
        ...initialState,
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
