/**import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import React from "react";

import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <App /> },
      
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
*/