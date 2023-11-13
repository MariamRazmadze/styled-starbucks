import { Route, Routes, useLoaderData } from "react-router-dom";
import Menu from "./Menu";
import FirstPage from "./FirstPage";
import CoffeePage from "./CoffeePage";
import { CoffeeData } from "./CategoryPage";
import { v4 as uuidv4 } from "uuid";

export default function MainMenu() {
  const coffees = useLoaderData() as CoffeeData[];
  const routes =
    coffees &&
    coffees.map((coffee, index) => {
      const categoryName = Object.keys(coffee)[0];
      const path = `${categoryName.replace(" ", "-")}`;

      return (
        <Route
          path={path}
          element={
            <Menu
              coffeeIndex={index}
              categoryName={categoryName}
              coffees={coffees}
            />
          }
          key={uuidv4()}
        />
      );
    });

  return (
    <Routes>
      <Route path="/" element={<FirstPage coffees={coffees} />} />
      <Route path="/product/:id" element={<CoffeePage coffees={coffees} />} />
      {routes}
    </Routes>
  );
}
