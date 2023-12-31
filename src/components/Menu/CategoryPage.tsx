import { Coffee } from "./Coffee";
import styled from "styled-components";
const MenuContainer = styled.main`
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const MenuDiv = styled.div`
  width: 100%;
`;

const MenuH2 = styled.h2`
  color: #8f797d;
  font-weight: 600;
  padding: 2px 2rem;
`;

const MenuH1 = styled.h1`
  padding: 1rem 2rem;
`;

const MainTitle = styled(MenuH1)`
  font-size: 28px;
`;

const MenuP = styled.p`
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.6;
  width: 80%;
`;

const Coffees = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4.8rem;
  margin-top: 2rem;
  padding: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CoffeeHeading = styled.h1`
  padding: 2rem;
  border-bottom: 1px solid lightgray;
`;

export interface CoffeeItem {
  id: number;
  name: string;
  photoName: string;
  type: string;
  unavailable: boolean;
  calories: string;
  fat: string;
  sugar: string;
  description: string;
  detailedPhotoName: string;
  stars: string;
  prices: {
    [size: string]: number;
    short: number;
    tall: number;
    grande: number;
    venti: number;
  };
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
    name: string;
  };
};

interface GroupedCoffees {
  [key: string]: CoffeeItem[];
}

function groupBy(array: CoffeeItem[], key: "type"): GroupedCoffees {
  return array.reduce((result: GroupedCoffees, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}
export default function CategoryPage({ category }: CoffeeData) {
  const coffeeArray = category.items || [];
  const groupedCoffees = groupBy(coffeeArray, "type");
  const sortedTypes = Object.keys(groupedCoffees).sort();

  return (
    <MenuContainer>
      <MenuH2>Menu/{category.name}</MenuH2>
      {coffeeArray.length > 0 ? (
        <>
          <MainTitle>{category.name}</MainTitle>
          {sortedTypes.map(
            (type) =>
              groupedCoffees[type].length > 0 && (
                <MenuDiv key={type}>
                  <CoffeeHeading>{type}</CoffeeHeading>
                  <Coffees>
                    {groupedCoffees[type].map((coffee) => (
                      <Coffee coffeeObj={coffee} key={coffee.id} />
                    ))}
                  </Coffees>
                </MenuDiv>
              )
          )}
        </>
      ) : (
        <MenuP>
          We're still Working on your {category.name} menu. Please Come back
          later.
        </MenuP>
      )}
    </MenuContainer>
  );
}
