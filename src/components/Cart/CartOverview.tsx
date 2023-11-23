import styled from "styled-components";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { Link } from "react-router-dom";

const StyledCartOverview = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => theme.houseGreen};
  color: white;
  height: 75px;
  width: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: white;
    font-size: 19px;
    font-weight: 700;
  }
`;

const CartDiv = styled.div`
  background-image: url("/cart/cart.svg");
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
`;

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  return (
    <StyledCartOverview>
      <p>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>

      <Link to="/cart">
        <CartDiv>{totalCartQuantity} </CartDiv>
      </Link>
    </StyledCartOverview>
  );
}

export default CartOverview;
