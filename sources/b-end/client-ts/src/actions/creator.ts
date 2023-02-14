// TS Related import
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../stores";

import { Country } from "../reducers/countriesReducer";
import { JikanResponse } from "../reducers/jikanReducer";
import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
  COUNTER_RESET,
  COUNTRIES_PENDING,
  COUNTRIES_SUCCESS,
  COUNTRIES_REJECT,
  JIKAN_PENDING,
  JIKAN_SUCCESS,
  JIKAN_REJECT,
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

// Action Creator for Jikan

// di sini juga masih sama dengan sebelumnya
export const jikanPending = () => ({
  type: JIKAN_PENDING,
});

export const jikanSuccess = (responseJson: JikanResponse) => ({
  type: JIKAN_SUCCESS,
  payload: responseJson,
});

export const jikanError = (errorMessage: Error | string | unknown) => ({
  type: JIKAN_REJECT,
  payload: errorMessage,
});

// Magic Thunk dimulai di sini !!!

// Karena di sini menggunakan TypeScript
// Maka untuk fungsi yang digunakan harus menggunakan ThunkAction

/*
export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
*/

export const fetchFromJikan =
  /*
  Generic R, S, E, A yang digunakan adalah sebagai berikut:
  R -> Return value, karena di sini kita tidak ada return, maka "void"
  S -> getState value, karena di sini getState adalah SELURUH state yang ada
          maka kita menggunakan RootState (gabungan seluruh state yang ada)
  E -> extra value, karena tidak digunakan, maka "unknown" kan saja
  A -> Action -> karena Actionnya kita tidak definisikan explicit
          maka kita menggunakan AnyAction saja
  */


    (): ThunkAction<void, RootState, unknown, AnyAction> =>
    // Di sini kita akan menggunakan Thunk

    // Sebuah fungsi yang diselipkan di dalam fungsi, untuk bisa menggunakan "impure function"
    // yang memiliki side effect

    // Karena kita menggunakan Redux Thunk

    // untuk setiap fungsi yang diselipkan ini HARUS menerima max 2 parameter optional:
    // - [OPTIONAL] dispatch (untuk memanggil dispatcher)
    // - [OPTIONAL] getState (untuk membaca seluruh state yang ada sekarang ini)

    // Dan karena fungsi ini diselipkan di dalam fungsi lainnya,
    // fungsi ini BOLEH menggunakan async function
    async (dispatch, getState) => {
      // di sini kita akan coba untuk menggunakan dispatch untuk menjalankan action
      dispatch(jikanPending());

      // Di sini karena sudah async await dan sifatnya impure, boleh menggunakan fetch !
      try {
        const response = await fetch("https://api.jikan.moe/v4/seasons/now");
        const responseJson = await response.json();

        dispatch(jikanSuccess(responseJson));
      } catch (err) {
        // Boleh dispatch di sini
        dispatch(jikanError(err));
      } finally {
        // Misalnya di sini kita ingin melihat state yang ada sekarang
        // Bisa menggunakan getState
        console.log("Finally", getState());
      }
    };
