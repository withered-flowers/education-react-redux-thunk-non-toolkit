import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
  COUNTER_RESET,
} from "../actions/type";

const initialState = {
  counter: 100,
};

// Action Creator

const counterReducer = (state = initialState, action) => {
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
