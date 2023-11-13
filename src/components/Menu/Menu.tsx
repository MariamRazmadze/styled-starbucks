import styled from "styled-components";
import CategoryPage from "./CategoryPage";
import SideMenu from "./SideMenu";
import { CoffeeData } from "./CategoryPage";

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
  coffees,
}: {
  coffeeIndex: number;
  categoryName: string;
  coffees: CoffeeData[];
}) {
  const category = {
    ...coffees[coffeeIndex][categoryName],
    name: categoryName,
  };

  return (
    <MenuBody>
      <SideMenu coffees={coffees} />
      <CategoryPage category={category} />;
    </MenuBody>
  );
}
