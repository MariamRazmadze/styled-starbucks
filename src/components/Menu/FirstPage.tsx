import styled from "styled-components";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import SubNav from "./SubNav";
import { MenuProps } from "./SideMenu";
import { v4 as uuidv4 } from "uuid";
const StyledCoffee = styled.li`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  width: 100%;
  img {
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    aspect-ratio: 1;
  }
  @media (max-width: 768px) {
    img {
      width: 9rem;
      height: 9rem;
    }
  }
`;
const MenuContainer = styled.main`
  margin-left: 10%;
  max-width: 100rem;
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;
const MenuDiv = styled.div`
  width: 100%;
`;

const MenuH1 = styled.h1`
  padding-bottom: 3rem;
  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MainTitle = styled(MenuH1)`
  font-weight: 700;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Coffees = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4.8rem;
  margin-top: 2rem;
  padding: 0;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CoffeeHeading = styled.h1`
  padding: 2rem 0;
  font-weight: 700;
  border-bottom: 1px solid lightgray;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FirstPageWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 768px) {
    display: block;
  }
`;
export default function FirstPage({ coffees }: MenuProps) {
  return (
    <>
      <SubNav />
      <FirstPageWrapper>
        <SideMenu coffees={coffees} />
        <MenuContainer>
          <MainTitle>Menu</MainTitle>
          <TitleContainer>
            <CoffeeHeading>Drinks</CoffeeHeading>
          </TitleContainer>
          <Coffees>
            {coffees &&
              coffees.map((coffee) => {
                const category = Object.keys(coffee)[0];
                const image = coffee[category].photoName;
                const link = `${category.replace(" ", "-")}`;
                return (
                  <MenuDiv key={uuidv4()}>
                    <Link to={link}>
                      <StyledCoffee>
                        <img src={image} alt={category} />

                        <h3>{category}</h3>
                      </StyledCoffee>
                    </Link>
                  </MenuDiv>
                );
              })}
          </Coffees>
        </MenuContainer>
      </FirstPageWrapper>
    </>
  );
}
