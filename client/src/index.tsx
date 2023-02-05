import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Subpage from "./Subpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Whoops! This cannot be found!</div>,
    children: [
      {
        path: "/subpage",
        element: <Subpage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <RouterProvider router={router} />
);
