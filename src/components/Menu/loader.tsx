import { getCoffees } from "../../services/coffeeApi";

export async function loader() {
  const menu = await getCoffees();
  return menu;
}
