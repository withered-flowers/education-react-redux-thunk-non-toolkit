// Kita akan menggunakan redux di sini
import { useSelector, useDispatch } from "react-redux";

// Import RootState untuk bisa menggunakan useSelector
import { RootState } from "../stores";

// Supaya tidak salah, kita akan menggunakan action creator di sini
import {
  counterDecrement,
  counterReset,
  counterIncrement,
} from "../actions/creator";

const HomePage = () => {
  // Select state yang ingin digunakan
  // State sekarang akan memiliki identifier object awal
  // state.[namaReducer].[namaPropertyObject]

  // Supaya cepat, kita akan destructuring di sini
  // Ingat pada counterReducer, nama statenya adalah "counter"
  // sehingga kita akan destructuring counter di sini
  const { counter } = useSelector((state: RootState) => state.counter);

  // Karena kita juga ingin menggunakan dispatcher, maka kita menggunakan useDispatch
  const dispatch = useDispatch();

  const buttonDecrementOnClickHandler = () => {
    dispatch(counterDecrement());
  };

  const buttonResetOnClickHandler = () => {
    dispatch(counterReset());
  };

  const buttonIncrementOnClickHandler = () => {
    dispatch(counterIncrement());
  };

  return (
    <>
      <h3 className="text-xl font-semibold">Simple Counter</h3>

      <section>
        Current counter is: {counter}
        <section className="flex flex-row gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-400 hover:text-white py-1 px-3 text-sm rounded-lg"
            onClick={buttonDecrementOnClickHandler}
          >
            Decrement
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-400 hover:text-white py-1 px-3 text-sm rounded-lg"
            onClick={buttonResetOnClickHandler}
          >
            Reset
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-400 hover:text-white py-1 px-3 text-sm rounded-lg"
            onClick={buttonIncrementOnClickHandler}
          >
            Increment
          </button>
        </section>
      </section>
    </>
  );
};

export default HomePage;
