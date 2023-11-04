import { CoffeeState, CoffeeAction } from "../types/allInterfaces";

export const coffeeInitialState: CoffeeState = {
  coffees: [],
  status: "loading",
};
export function coffeeReducer(
  state: CoffeeState,
  action: CoffeeAction
): CoffeeState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        coffees: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
}
