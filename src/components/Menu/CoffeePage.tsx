import { useParams } from "react-router-dom";
import { MenuProps } from "./SideMenu";
import { useEffect } from "react";
import SizeSelector from "./SizeSelector";
import CoffeeBreadcrumbs from "./CoffeeBreadcrumbs";
import styled from "styled-components";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { BsFillEmojiWinkFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.detailsColor};
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10%;
  align-items: center;
  padding: 5%;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.detailsColor};
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 35%;
  height: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const PlaceholderImage = styled.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const CoffeeImage = styled.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const HeaderTexts = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const CoffeeName = styled.h1`
  font-size: 36px;
  color: white;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Calories = styled.div`
  color: ${({ theme }) => theme.whiteSoft};
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 19px;
  }
`;

const BottomTextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 25%;
  margin: 2% 5%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 3rem;
  }
`;

const StarCost = styled.div`
  border: 1px solid ${({ theme }) => theme.colorGold};
  border-radius: 6px;
  color: ${({ theme }) => theme.colorGold};
  font-size: 14px;
  padding: 0 8px;
  width: fit-content;
`;

const CoffeeDescription = styled.div`
  color: ${({ theme }) => theme.whiteSoft};
  font-size: 14px;
  font-weight: 500;
`;

const Includes = styled.p`
  font-size: 14px;
  color: white;
  font-weight: 700;
`;

const MiddleSpan = styled.span`
  color: ${({ theme }) => theme.greenAccent};
  margin-left: 5px;
`;

const MiddleTexts = styled.div`
  padding-bottom: 5%;
  width: 220px;
  @media (max-width: 768px) {
    display: none;
  }
`;

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

  const categoryObject = coffees.find((coffeeObject) =>
    Object.values(coffeeObject)[0].items.some((item) => item.id === Number(id))
  );
  let categoryData;
  if (categoryObject) {
    categoryData = Object.values(categoryObject)[0];
  }

  return (
    <div>
      <CoffeeBreadcrumbs coffee={coffee} categoryData={categoryData} />

      <TopSection>
        <ImageContainer>
          <PlaceholderImage
            src="/coffees/coffee-placeholder.webp"
            alt="placeholder"
          />
          <CoffeeImage src={coffee.detailedPhotoName} alt={coffee.name} />
        </ImageContainer>

        <HeaderTexts>
          <CoffeeName>{coffee.name}</CoffeeName>
          <Calories>{`${coffee.calories} Calories`}</Calories>
        </HeaderTexts>
      </TopSection>
      <MiddleSection>
        <SizeSelector />
        <MiddleTexts>
          <h2>
            Confused with sizes?
            <MiddleSpan>
              <BsFillEmojiWinkFill />
            </MiddleSpan>
            Watch this
            <MiddleSpan>
              <BsFillArrowRightSquareFill />
            </MiddleSpan>
          </h2>
        </MiddleTexts>
        <VideoPlayer />
      </MiddleSection>
      <BottomSection>
        <BottomTextsWrapper>
          <StarCost>
            <span>{coffee.stars}</span>
            <span>★</span>
            <span style={{ marginLeft: "5px" }}>item</span>
          </StarCost>
          <CoffeeDescription>{coffee.description}</CoffeeDescription>
          <Includes>{`${coffee.calories} Calories, ${coffee.sugar}g sugar, ${coffee.fat}g fat`}</Includes>
        </BottomTextsWrapper>
      </BottomSection>
    </div>
  );
}
