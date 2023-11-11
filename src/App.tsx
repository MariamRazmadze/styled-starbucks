import GlobalStyles from "./moreStyles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { CitiesProvider } from "./contexts/CitiesContext";

import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./components/HomePage/Homepage"));
const MainMenu = lazy(() => import("./components/Menu/MainMenu"));
const MainQuiz = lazy(() => import("./components/CoffeeQuiz/MainQuiz"));
const AuthForm = lazy(
  () => import("./components/AuthenticationContainer/AuthForm")
);
const RewardSteps = lazy(() => import("./components/Rewards/RewardSteps"));
const AppLayout = lazy(() => import("./components/StoreLocator/AppLayout"));
const PageNotFound = lazy(() => import("./components/UI/PageNotFound"));
import GlobalLayout from "./components/UI/GlobalLayout";
import { rewardsData } from "../data/rewardsData";
import Loader from "./components/UI/Loader";
import { CoffeeProvider } from "./contexts/CoffeeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const defaultTheme = {
  primaryColor: "#006241;",
  greenAccent: "#00754a",
  secondaryBackground: " #d4e9e2;",
};

const routes = [
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { path: "/menu/*", element: <MainMenu /> },
      { path: "store-locator", element: <AppLayout /> },
      { path: "login", element: <AuthForm defaultIsLogin={true} /> },
      { path: "register", element: <AuthForm defaultIsLogin={false} /> },
      { path: "rewards", element: <RewardSteps content={rewardsData} /> },
      { path: "quiz", element: <MainQuiz /> },
      {
        path: "/store-locator",
        element: <AppLayout />,
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];
const router = createBrowserRouter(routes);
export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CoffeeProvider>
        <CitiesProvider>
          <GlobalStyles />
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </CitiesProvider>
      </CoffeeProvider>
    </ThemeProvider>
  );
}
