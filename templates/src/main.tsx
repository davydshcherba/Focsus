import { createRoot } from "react-dom/client";
// @ts-ignore: Import will fail if index.css doesn't exist, but ignore for now.
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
