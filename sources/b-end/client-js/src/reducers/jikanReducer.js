import { JIKAN_PENDING, JIKAN_REJECT, JIKAN_SUCCESS } from "../actions/type";

const initialState = {
  isLoading: true,
  animes: [],
  errorMsg: "",
};

const jikanReducer = (state = initialState, action) => {
  // Di sini semuanya masih baik baik saja (sama dengan yang sebelumnya)
  switch (action.type) {
    case JIKAN_PENDING:
      return {
        ...initialState,
      };

    case JIKAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        animes: action.payload,
      };

    case JIKAN_REJECT:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};

export default jikanReducer;
