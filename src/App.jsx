import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home/home.jsx";
import Animal from "./pages/animal/animal.jsx";
import Profile from "./pages/profile/profile.jsx";
import Favourites from "./pages/favourites/favourites.jsx";
import Chat from "./pages/chat/chat.jsx";
import ErrorPage from "./pages/error/error.jsx";
import Layout from "./layout/layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "animal/:id",
        element: <Animal />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
