import styled from "styled-components";
import { useCoffee } from "../../contexts/useCoffee";
import CategoryPage from "./CategoryPage";
import SideMenu from "./SideMenu";

const MenuBody = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10%;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Menu({
  coffeeIndex,
  categoryName,
}: {
  coffeeIndex: number;
  categoryName: string;
}) {
  const { coffees } = useCoffee();
  const category = {
    ...coffees[coffeeIndex][categoryName],
    name: categoryName,
  };
  console.log("category", category);

  return (
    <MenuBody>
      <SideMenu />
      <CategoryPage category={category} />;
    </MenuBody>
  );
}
