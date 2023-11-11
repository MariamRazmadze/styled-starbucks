import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "../UI/Loader";
import ErrorText from "../UI/ErrorText";
import { useCoffee } from "../../contexts/useCoffee";
import Menu from "./Menu";
import FirstPage from "./FirstPage";

export default function MainMenu() {
  const { coffeeStatus, coffees } = useCoffee();
  const location = useLocation();

  const routes =
    coffees &&
    coffees.map((coffee, index) => {
      const categoryName = Object.keys(coffee)[0];
      const path = `${categoryName.replace(" ", "-")}`;

      return (
        <Route
          path={path}
          element={<Menu coffeeIndex={index} categoryName={categoryName} />}
          key={path}
        />
      );
    });

  return (
    <>
      {coffeeStatus === "loading" && <Loader />}
      {coffeeStatus === "error" && <ErrorText />}
      {coffeeStatus === "ready" && location.pathname === "/menu" && (
        <FirstPage />
      )}
      <Routes>{routes}</Routes>
    </>
  );
}
