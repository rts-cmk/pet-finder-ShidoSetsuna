//normal imports
import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect, useState } from "react";

//pages
import Home from "./pages/home/home.jsx";
import Animal from "./pages/animal/animal.jsx";
import Profile from "./pages/profile/profile.jsx";
import Favourites from "./pages/favourites/favourites.jsx";
import Chat from "./pages/chat/chat.jsx";
import ErrorPage from "./pages/error/error.jsx";
//components
import Onboarding from "./components/onboarding/onboarding.jsx";
//Layout
import Layout from "./layout/layout.jsx";

const hasSeenOnboarding = () => {
  return localStorage.getItem("skip_onboarding") === "true";
};

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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (hasSeenOnboarding()) {
      setAppReady(true);
    } else if (!hasSeenOnboarding()) {
      setShowOnboarding(true);
    } else {
      setAppReady(true);
    }

    if (!hasSeenOnboarding()) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingSkip = () => {
    localStorage.setItem("skip_onboarding", "true");
    setShowOnboarding(false);
    setAppReady(true);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("skip_onboarding", "true");
    setShowOnboarding(false);
    setAppReady(true);
  };

  if (showOnboarding && !hasSeenOnboarding()) {
    return (
      <Onboarding
        onSkip={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
