import { useParams } from "react-router-dom";
import { MenuProps } from "./SideMenu";
import { useEffect } from "react";
import SizeSelector from "./SizeSelector";

export default function CoffeePage({ coffees }: MenuProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const productArray = coffees.flatMap(
    (coffee) => Object.values(coffee)[0].items || []
  );
  const { id } = useParams();
  const coffee = productArray.find((item) => item.id === Number(id));
  if (!coffee) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{coffee.name}</h1>
      <img src={coffee.photoName} alt={coffee.name} />
      <SizeSelector />
    </div>
  );
}
