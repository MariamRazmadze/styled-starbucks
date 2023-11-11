import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCoffee } from "../../contexts/useCoffee";

const StyledSideMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 125px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SideMenuHeader = styled.h2`
  font-weight: 19px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
  margin-left: 1rem;
`;

export default function SideMenu() {
  const { coffees } = useCoffee();
  console.log("coff", coffees);
  return (
    <StyledSideMenu>
      <SideMenuHeader>Drinks</SideMenuHeader>
      <Nav defaultActiveKey="/home" className="flex-column">
        {coffees &&
          coffees.map((coffee, index) => {
            const category = Object.keys(coffee)[0];
            const link = `/menu/${category.replace(" ", "-")}`;
            return (
              <Link key={index} to={link}>
                {category}
              </Link>
            );
          })}
      </Nav>
    </StyledSideMenu>
  );
}
