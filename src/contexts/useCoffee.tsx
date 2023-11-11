import { useContext } from "react";
import { CoffeeContext } from "./CoffeeContext";

export function useCoffee() {
  const context = useContext(CoffeeContext);
  if (context === undefined) {
    throw new Error("useCoffee must be used within a CoffeeProvider");
  }
  return context;
}
