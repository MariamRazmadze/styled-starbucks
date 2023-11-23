import { formatCurrency } from "../../utils/helpers";
import Card from "../UI/Card";
import styled from "styled-components";
import { StarCost } from "../Menu/StyledCoffeePage";
import UpdateQuantity from "./UpdateQuantity";

const CardContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const CardImage = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  aspect-ratio: 1;

  @media (max-width: 768px) {
    width: 9rem;
    height: 9rem;
  }
`;

const Starz = styled(StarCost)`
  color: #000000de;
  border: none;
  padding: 0;
  font-size: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function CartItem({ item }) {
  const { coffeeId, size, name, image, stars, quantity, totalPrice } = item;

  return (
    <Card>
      <CardContentWrapper>
        <CardImage src={image} alt={name} />
        <Info>
          <h1>
            {quantity}&times;{name}
          </h1>
          <h3>{size}</h3>
          <Starz>
            <span>{stars}</span>
            <span>★</span>
            <span style={{ marginLeft: "5px" }}>item</span>
          </Starz>
          <div>
            <h3>{formatCurrency(totalPrice)}</h3>
          </div>
          <UpdateQuantity coffeeId={coffeeId} />
        </Info>
      </CardContentWrapper>
    </Card>
  );
}

export default CartItem;
