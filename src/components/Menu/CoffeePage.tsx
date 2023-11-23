import { useParams } from "react-router-dom";
import { MenuProps } from "./SideMenu";
import { useEffect, useState } from "react";
import SizeSelector from "./SizeSelector";
import CoffeeBreadcrumbs from "./CoffeeBreadcrumbs";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { BsFillEmojiWinkFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import CartOverview from "../Cart/CartOverview";
import {
  TopSection,
  ImageContainer,
  PlaceholderImage,
  CoffeeImage,
  HeaderTexts,
  CoffeeName,
  CoffeeDescription,
  Calories,
  MiddleSection,
  MiddleSpan,
  MiddleTexts,
  BottomSection,
  BottomTextsWrapper,
  StarCost,
  Includes,
  OrderButton,
} from "./StyledCoffeePage";
import { useDispatch } from "react-redux";
import { addItem } from "../Cart/cartSlice";

export default function CoffeePage({ coffees }: MenuProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const productArray = coffees.flatMap(
    (coffee) => Object.values(coffee)[0].items || []
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("Grande");
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

  function handleAddToOrder() {
    let newItem;

    if (coffee) {
      const sizePrice = coffee.prices[selectedSize.toLowerCase()];
      console.log("selectedSize", selectedSize);
      console.log("sizePrice", sizePrice);
      newItem = {
        coffeeId: coffee.id,
        name: coffee.name,
        image: coffee.photoName,
        stars: coffee.stars,
        quantity: 1,
        size: selectedSize,
        unitPrice: sizePrice,
        totalPrice: sizePrice,
      };
      newItem.totalPrice = newItem.unitPrice * newItem.quantity;
      console.log(typeof newItem.totalPrice);
    }

    if (newItem) {
      dispatch(addItem(newItem));
    }
  }

  return (
    <>
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
          <SizeSelector
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
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
      {!coffee.unavailable && (
        <OrderButton onClick={handleAddToOrder}>Add to Order</OrderButton>
      )}
      <CartOverview />
    </>
  );
}
