// Karena kita ingin menggunakan Thunk, dan Thunk bisa dicapai dengan menggunakan
// Middleware di dalam redux, maka kita akan import applyMiddleware di sini
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

// Karena sekarang kita ingin menggunakan Thunk
// jangan lupa import thunk dari redux-thunk
import thunk from "redux-thunk";

import counterReducer from "../reducers/counterReducer";
import countriesReducer from "../reducers/countriesReducer";
// Sekarang kita akan import jikanReducer di sini
import jikanReducer from "../reducers/jikanReducer";

// Karena reducersnya lebih dari satu, maka kita akan menggabungkannya jadi satu
// (Karena store hanya menerima 1 reducer saja)
const rootReducer = combineReducers({
  // Karena yang diimport namanya ada "reducer"-nya
  // Sedangkan yang kita gabungkan nanti tidak ada kata "reducer"-nya
  // Maka kita akan aliaskan saja
  counter: counterReducer,
  countries: countriesReducer,
  jikan: jikanReducer,
});

const store = createStore(
  rootReducer,
  // Di sini kita akan menambahkan middleware baru yaitu si Thunk dari redux-thunk
  applyMiddleware(thunk)
);

export default store;
