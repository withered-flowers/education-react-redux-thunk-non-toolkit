import { createBrowserRouter } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout";

import HomePage from "../pages/HomePage";
import JikanPage from "../pages/JikanPage";
import CountriesPage from "../pages/CountriesPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/jikan",
        element: <JikanPage />,
      },
      {
        path: "/countries",
        element: <CountriesPage />,
      },
    ],
  },
]);

export default router;
