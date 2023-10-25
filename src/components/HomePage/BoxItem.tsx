import {
  BoxTexts,
  BoxTitle,
  BoxPromo,
  HomeButton,
  BoxContainer,
} from "./StyledHome";

interface Item {
  id: string;
  title: string;
  promo: string;
  photoName: string;
  buttonText: string;
  backgroundColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}
interface BoxItemProps {
  item: Item;
  isReversed?: boolean;
}

export function BoxItem({ item, isReversed }: BoxItemProps) {
  return (
    <BoxContainer
      $isReversed={isReversed}
      style={{ backgroundColor: item.backgroundColor }}
    >
      <img src={item.photoName} alt="" />
      <BoxTexts>
        <BoxTitle>{item.title}</BoxTitle>
        <BoxPromo>{item.promo}</BoxPromo>
        <HomeButton
          $buttonColor={item.buttonColor}
          $buttonHoverColor={item.buttonHoverColor}
        >
          {item.buttonText}
        </HomeButton>
      </BoxTexts>
    </BoxContainer>
  );
}
