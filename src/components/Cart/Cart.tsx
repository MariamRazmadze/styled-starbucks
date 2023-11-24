import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/navbar/logo.svg";
import { IoIosArrowBack } from "react-icons/io";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { setRedirectUrl } from "../Auth/authSlice";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
  getCart,
  clearCart,
} from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { CartItemType } from "./cartSlice";
import {
  StyledCart,
  CartHeader,
  CartItemsContainer,
  CartSummary,
  BackToMenu,
  CartMain,
  CartMainHeader,
  ContinueButton,
  ClearButton,
} from "./StyledCart";
import CartItem from "./CartItem";
import LoginModal from "./LoginModal";
import { useState } from "react";
import { RootState } from "../../store";

function Cart() {
  const cart = useSelector(getCart);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleContinue = () => {
    if (isLoggedIn) {
      navigate("/order/new");
    } else {
      dispatch(setRedirectUrl(location.pathname));
      setShowLoginModal(true);
    }
  };

  return (
    <StyledCart>
      <CartSummary>
        <CartHeader>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <Link to="/menu">
            <BackToMenu>
              <IoIosArrowBack /> Back to menu
            </BackToMenu>
          </Link>
        </CartHeader>
        <CartMain>
          <CartMainHeader>
            Review Order {`(${totalCartQuantity})`}
          </CartMainHeader>
          <h3>Prep time: 4-9 min</h3>
          <h3>Total Price: {formatCurrency(totalCartPrice)}</h3>
        </CartMain>
        <ClearButton onClick={() => dispatch(clearCart())}>
          Clear cart
        </ClearButton>
      </CartSummary>

      <CartItemsContainer>
        <div>
          {cart.length ? (
            cart.map((item: CartItemType) => (
              <CartItem item={item} key={item.coffeeId} />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>
        <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
      </CartItemsContainer>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            navigate("/order/new");
          }}
          onCancel={() => setShowLoginModal(false)}
        />
      )}
    </StyledCart>
  );
}

export default Cart;
