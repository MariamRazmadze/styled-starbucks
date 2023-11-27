import GlobalStyles from "./moreStyles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./components/HomePage/Homepage"));
const MainMenu = lazy(() => import("./components/Menu/MainMenu"));
const Auth = lazy(() => import("./components/Auth/Auth"));
const RewardSteps = lazy(() => import("./components/Rewards/RewardSteps"));
const AppLayout = lazy(() => import("./components/StoreLocator/AppLayout"));
const PageNotFound = lazy(() => import("./components/UI/PageNotFound"));
import GlobalLayout from "./components/UI/GlobalLayout";
import { rewardsData } from "../data/rewardsData";
import Loader from "./components/UI/Loader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as menuLoader } from "./components/Menu/loader";
import ErrorText from "./components/UI/ErrorText";
import CreateOrder, {
  action as createOrderAction,
} from "./components/Order/CreateOrder";
import Order, { loader as orderLoader } from "./components/Order/Order";
import Cart from "./components/Cart/Cart";

const defaultTheme = {
  primaryColor: "#006241;",
  greenAccent: "#00754a",
  secondaryBackground: " #d4e9e2;",
  redAccent: "#ef3341",
  detailsColor: "#1f3933;",
  whiteSoft: "#a8b2a7",
  colorGold: "#cba258",
  houseGreen: "#1e3932;",
};

const routes = [
  {
    element: <GlobalLayout />,
    errorElement: <ErrorText />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { path: "/menu/*", element: <MainMenu />, loader: menuLoader },

      { path: "store-locator", element: <AppLayout /> },
      { path: "login", element: <Auth defaultIsLogin={true} /> },
      { path: "register", element: <Auth defaultIsLogin={false} /> },
      { path: "rewards", element: <RewardSteps content={rewardsData} /> },
      {
        path: "/store-locator",
        element: <AppLayout />,
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  { path: "/cart", element: <Cart /> },
  {
    path: "/order/new",
    element: <CreateOrder />,
    action: createOrderAction,
  },
  { path: "/order/:orderId", element: <Order />, loader: orderLoader },
];
const router = createBrowserRouter(routes);
export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}
