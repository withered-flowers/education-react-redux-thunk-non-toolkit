// Karena kita ingin menggunakan Thunk, dan Thunk bisa dicapai dengan menggunakan
// Middleware di dalam redux, maka kita akan import applyMiddleware di sini

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";

// Karena sekarang kita ingin menggunakan Thunk
// jangan lupa import thunk dari redux-thunk
import thunk, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";

// Di sini juga kita akan meminta useDispatch untuk membuat custom hooks
import { useDispatch } from "react-redux";

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

// Untuk bisa membaca state yang dimiliki harus menggunakan RootState
export type RootState = ReturnType<typeof rootReducer>;
// Sekarang juga kita membutuhkan AppDispatch
// Karena by default useDispatch hanya bertipe Dispatch<AnyAction> saja

// Di sini kita akan menggunakan ThunkDispatch dari redux-thunk
// ThunkDispatch menerima 3 Generic
// - State -> State apa saja yang ada dalam getState
// - Extra Args -> Argument apa yang bisa diberikan ke dalam Thunk
// - Action -> Action apa saja yang bisa dilakukan
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const store = createStore(
  rootReducer,
  // Di sini kita akan menambahkan middleware baru yaitu si Thunk dari redux-thunk

  // Karena di sini kita menggunakan TypeScript
  // Maka cara mendefinisikannya pun menjadi berbeda

  // applyMiddleware ini akan menerima Generic untuk Dispatcher dan State
  // di sini Dispatchernya akan menadji AppDispatch
  // dan State-nya akan menggunakan RootState
  applyMiddleware<AppDispatch, RootState>(
    // thunk yang didefinisikan pun menjadi berbeda
    // thunk ini akan menjadi sebuah ThunkMiddleware
    // yang menerima 3 buah Generic:
    // - State, Action, dan Extra Args
    // Di sini:
    // - State akan menjadi RootState
    // - Action akan menjadi AnyAction
    // - Extra Args akan menjadi unknown
    thunk as ThunkMiddleware<RootState, AnyAction, unknown>
  )
);

// Karena AppDispatch ini khusus, jadi kita harus membungkus Hooks useDispatch
// ke dalam custom hooks bernama useAppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
