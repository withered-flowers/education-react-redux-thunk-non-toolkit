import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countriesError,
  countriesPending,
  countriesSuccess,
} from "../actions/creator";

const CountriesPage = () => {
  const { isLoading, countries, error } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();

  // Di sini kita tetap harus menggunakan useEffect untuk fetch data
  // Karena yang kita ketahui sekarang adalah:
  // redux WAJIB pure function sehingga penggunaan fetch yang adalah impure / side effect
  // tidak boleh digunakan
  useEffect(() => {
    (async () => {
      try {
        dispatch(countriesPending());

        const response = await fetch("https://restcountries.com/v3.1/all");
        const responseJson = await response.json();

        dispatch(countriesSuccess(responseJson));
      } catch (err) {
        dispatch(countriesError(err));
      }
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

      {!error && countries.length > 0 && (
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th>Lat</th>
              <th>Long</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <td className="p-2">{country.name.official}</td>
                <td className="text-right">{country.latlng[0].toFixed(2)}</td>
                <td className="text-right">{country.latlng[1].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CountriesPage;
