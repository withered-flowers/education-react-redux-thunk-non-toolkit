// Kita tetap memerlukan useEffect yah !
import { useEffect } from "react";
// Perhatikan di sini kita tidak menggunakan useDispatch lagi !
import { useSelector } from "react-redux";
import { fetchFromJikan } from "../actions/creator";

// TypeScript related Import
import { AnyAction } from "redux";
import { Anime } from "../reducers/jikanReducer";
// Di sini kita akan menggunakan useAppDispatch !
import { RootState, useAppDispatch } from "../stores";

const JikanPage = () => {
  const {
    isLoading,
    animes,
    errorMsg: error,
  } = useSelector((state: RootState) => state.jikan);

  // dispatch yang digunakan di sini bukan hanya menerima AnyAction saja
  // tapi juga menerima ThunkAction
  // (Sudah digabung dalam AppDispatch)
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // Di dalam sini kita bisa memanggil dispatch fetchFromJikan tadi !

      // Kenapa bisa?

      // Karena sudah di"selip"kan middleware Redux Thunk !

      // (TypeScript) Sehingga di sini sudah bisa menggunakan fetchFromJikan
      // yang merupakan Thunk !
      dispatch(fetchFromJikan());
    })();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1 className="animate-pulse text-red-400 text-3xl">Loading ...</h1>
      </section>
    );
  }

  return (
    <>
      <h3 className="text-xl font-semibold">REST Countries</h3>

      {error && <p>{error}</p>}

      {!error && animes.data.length > 0 && (
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th>Type</th>
              <th>Episodes</th>
            </tr>
          </thead>
          <tbody>
            {animes.data.map((anime: Anime) => (
              <tr key={anime.mal_id}>
                <td>{anime.title}</td>
                <td>{anime.type}</td>
                <td>{anime.episodes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default JikanPage;
