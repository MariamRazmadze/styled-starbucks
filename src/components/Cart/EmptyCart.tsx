import { Link } from "react-router-dom";
import { Button } from "../UI/Button";
import styled from "styled-components";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: flex-start;
  height: 100%;
  padding: 20% 10%;
  gap: 2rem;
`;

const EmptyHeader = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: #000000de;
`;

const EmptyText = styled.h3`
  color: #00000094;
  font-size: 19px;
`;

const EmptyContent = styled.div`
  padding-left: 4rem;
  padding-top: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EmptyButton = styled(Button)`
  min-width: 35px;
  min-height: 35px;
  font-weight: 700;
  padding: 7px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.greenAccent};
  background-color: white;
`;

function EmptyCart() {
  return (
    <EmptyContainer>
      <img src="/cart/empty-cart.svg" alt="emtpy cart" height="200px" />
      <EmptyContent>
        <EmptyHeader>Start your next order</EmptyHeader>
        <EmptyText>
          As you add menu items, they'll appear here. You'll have a chance to
          review before placing your order.
        </EmptyText>
        <Link to="/menu">
          <EmptyButton>Add Items</EmptyButton>
        </Link>
      </EmptyContent>
    </EmptyContainer>
  );
}

export default EmptyCart;
