import { Form, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/coffeeApi";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearCart, getCart } from "../Cart/cartSlice";
import EmptyOrder from "./EmptyOrder";
import { getTotalCartPrice } from "../Cart/cartSlice";
import { GoBackIcon } from "../UI/ErrorText";
import { useNavigate } from "react-router-dom";
import { fetchAddress } from "../StoreLocator/citiesSlice";
import { RootState } from "../../store";
import { useDispatch } from "../../store";
import { useEffect } from "react";
import {
  StyledOrder,
  OrderInput,
  InputsContainer,
  OrderButton,
  OrderGoBack,
  OrderFormWrapper,
  InputWrapper,
  InputLabel,
} from "./StyledOrder";
import store from "../../store";

function CreateOrder() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const items = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const currentAddress = useSelector(
    (state: RootState) => state.cities.address
  );
  console.log(currentAddress);
  useEffect(() => {
    if (!currentAddress) {
      dispatch(fetchAddress());
    }
  }, [dispatch, currentAddress]);
  if (!items.length) return <EmptyOrder />;
  return (
    <StyledOrder>
      <OrderGoBack onClick={() => navigate(-1)}>
        <GoBackIcon />
        Go Back
      </OrderGoBack>
      <OrderFormWrapper>
        <h2>{userData.username}, Your current details are as follows:</h2>
        {/* <p>Phone Number: {userData.phoneNumber}</p>
        <p>Personal Number: {userData.personalNumber}</p> */}
        <p>Address: {currentAddress}</p>
        <h2>
          Confirm your current details to ensure a smooth delivery process
        </h2>
        <button onClick={() => dispatch(fetchAddress())}>get position</button>

        <Form method="POST">
          <InputsContainer>
            <InputWrapper>
              <InputLabel>Full Name:</InputLabel>
              <OrderInput type="text" name="full_name" required />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Phone number:</InputLabel>
              <OrderInput type="tel" name="phone_number" required />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Id Number: </InputLabel>
              <OrderInput type="text" name="id_number" required />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Address: </InputLabel>
              <OrderInput type="text" name="address" required />
            </InputWrapper>
            <div>
              <input type="hidden" name="items" value={JSON.stringify(items)} />
              <input type="hidden" name="total_price" value={totalPrice} />
              <OrderButton disabled={isSubmitting}>
                {isSubmitting ? "placing order..." : "Order now"}
              </OrderButton>
            </div>
          </InputsContainer>
        </Form>
      </OrderFormWrapper>
    </StyledOrder>
  );
}

interface Request {
  formData: () => Promise<FormData>;
}
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (typeof data.items !== "string") {
    throw new Error("Expected items to be a string");
  }

  const order = {
    ...data,
    cart: JSON.parse(data.items),
  };
  const errors = {};

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
