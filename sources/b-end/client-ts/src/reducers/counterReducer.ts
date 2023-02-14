import { AnyAction } from "redux";
import {
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  COUNTER_RESET,
} from "../actions/type";

interface CounterState {
  counter: number;
}

const initialState: CounterState = {
  counter: 100,
};

const counterReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case COUNTER_DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case COUNTER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
