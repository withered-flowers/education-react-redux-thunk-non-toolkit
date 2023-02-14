import { Country } from "../reducers/countriesReducer";
import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
  COUNTER_RESET,
  COUNTRIES_PENDING,
  COUNTRIES_SUCCESS,
  COUNTRIES_REJECT,
} from "./type";

// Action Creator for Counter
export const counterIncrement = () => ({
  type: COUNTER_INCREMENT,
});

export const counterDecrement = () => ({
  type: COUNTER_DECREMENT,
});

export const counterReset = () => ({
  type: COUNTER_RESET,
});

// Action Creator for Countries
export const countriesPending = () => ({
  type: COUNTRIES_PENDING,
});

export const countriesSuccess = (responseJson: Country[]) => ({
  type: COUNTRIES_SUCCESS,
  payload: responseJson,
});

export const countriesError = (errorMessage: Error | string | unknown) => ({
  type: COUNTRIES_REJECT,
  payload: errorMessage,
});
