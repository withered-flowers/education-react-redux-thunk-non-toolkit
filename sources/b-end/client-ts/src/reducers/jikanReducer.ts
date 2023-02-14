import { AnyAction } from "redux";
import { JIKAN_PENDING, JIKAN_REJECT, JIKAN_SUCCESS } from "../actions/type";

// Karena ini TypeScript, jadi harus direlasikan dengan baik

// Ini adalah data satuan
export type Anime = {
  mal_id: number;
  title: string;
  type: string;
  episodes: number;
};

export type JikanResponse = {
  data: Anime[];
};

// Ini adalah tipe data dari state yang akan dibentuk
interface JikanState {
  isLoading: boolean;
  animes: JikanResponse;
  errorMsg: Error | string;
}

const initialState: JikanState = {
  isLoading: true,
  // Di sini menjadi berbeda dengan versi JS
  // Karena harus didefinisikan dengan baik
  animes: {
    data: [],
  },
  errorMsg: "",
};

const jikanReducer = (state = initialState, action: AnyAction) => {
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
