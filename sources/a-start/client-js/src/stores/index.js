import { legacy_createStore as createStore, combineReducers } from "redux";

import counterReducer from "../reducers/counterReducer";
import countriesReducer from "../reducers/countriesReducer";

// Karena reducersnya lebih dari satu, maka kita akan menggabungkannya jadi satu
// (Karena store hanya menerima 1 reducer saja)
const rootReducer = combineReducers({
  // Karena yang diimport namanya ada "reducer"-nya
  // Sedangkan yang kita gabungkan nanti tidak ada kata "reducer"-nya
  // Maka kita akan aliaskan saja
  counter: counterReducer,
  countries: countriesReducer,
});

const store = createStore(rootReducer);

export default store;
