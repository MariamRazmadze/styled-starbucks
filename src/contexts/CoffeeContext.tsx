import { createContext, useReducer, useEffect } from "react";
import { coffeeReducer, coffeeInitialState } from "../reducers/coffeeReducer";
import { CoffeeAction } from "../types/allInterfaces";

interface CoffeesContextType {
  coffees?: CoffeeData[] | undefined;
  dispatch: React.Dispatch<CoffeeAction>;
  coffeeStatus: string;
}

export interface CoffeeItem {
  id: number;
  name: string;
  photoName: string;
  type: string;
  unavailable: boolean;
}

export type CoffeeCategory = {
  [category: string]: {
    items: CoffeeItem[];
  };
};

export type CoffeeData = {
  [category: string]: {
    items: CoffeeItem[];
    photoName: string;
    link: string;
  };
};

export const CoffeeContext = createContext<CoffeesContextType>({
  coffees: [],
  dispatch: () => {},
  coffeeStatus: "",
});

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  // const [{ coffees, status: coffeeStatus }, dispatchCoffee] = useReducer(
  //     coffeeReducer,
  //     coffeeInitialState
  //   );
  const [state, dispatch] = useReducer(coffeeReducer, coffeeInitialState);
  const { coffees, status: coffeeStatus } = state;

  useEffect(() => {
    fetch("https://starbucksapi.pythonanywhere.com/coffees")
      .then((res: Response) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.coffeeData })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(coffees);
  console.log(coffeeStatus);

  return (
    <CoffeeContext.Provider value={{ coffees, dispatch, coffeeStatus }}>
      {children}
    </CoffeeContext.Provider>
  );
}
