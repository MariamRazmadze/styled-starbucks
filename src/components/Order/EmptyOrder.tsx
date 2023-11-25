import { Link } from "react-router-dom";
import { Button } from "../UI/Button";
import styled from "styled-components";
import { OrderCartHeader, OrderBackToMenu, StyledOrder } from "./StyledOrder";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../../assets/navbar/logo.svg";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: flex-start;
  height: 100%;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 4rem;
  }
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

function EmptyOrder() {
  return (
    <StyledOrder>
      <OrderCartHeader>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <Link to="/menu">
          <OrderBackToMenu>
            <IoIosArrowBack /> Back to menu
          </OrderBackToMenu>
        </Link>
      </OrderCartHeader>
      <EmptyContainer>
        <img src="/cart/empty-cart.svg" alt="emtpy cart" height="200px" />
        <EmptyContent>
          <EmptyHeader>Start your next order</EmptyHeader>
          <EmptyText>Your cart is empty, start adding menu items</EmptyText>
          <Link to="/menu">
            <EmptyButton>Add Items</EmptyButton>
          </Link>
        </EmptyContent>
      </EmptyContainer>
    </StyledOrder>
  );
}

export default EmptyOrder;
