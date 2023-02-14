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

export const countriesSuccess = (responseJson) => ({
  type: COUNTRIES_SUCCESS,
  payload: responseJson,
});

export const countriesError = (errorMessage) => ({
  type: COUNTRIES_REJECT,
  payload: errorMessage,
});

// Action Creator for Jikan

// di sini juga masih sama dengan sebelumnya
export const jikanPending = () => ({
  type: JIKAN_PENDING,
});

export const jikanSuccess = (responseJson) => ({
  type: JIKAN_SUCCESS,
  payload: responseJson,
});

export const jikanError = (errorMessage) => ({
  type: JIKAN_REJECT,
  payload: errorMessage,
});

// Magic Thunk dimulai di sini !!!
export const fetchFromJikan =
  () =>
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
