import { Form, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/coffeeApi";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "../Cart/cartSlice";
import EmptyCart from "../Cart/EmptyCart";
import { getTotalCartPrice } from "../Cart/cartSlice";

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const items = useSelector(getCart);
  console.log("itemsin cart", items.length);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!items.length) return <EmptyCart />;
  return (
    <div>
      <h2>Confirm your current details to ensure a smooth delivery process</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="full_name" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone_number" required />
          </div>
        </div>
        <div>
          <label>Id Number</label>
          <div>
            <input type="text" name="id_number" required />
          </div>
        </div>
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>
        <div>
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <input type="hidden" name="total_price" value={totalPrice} />
          <button disabled={isSubmitting}>
            {isSubmitting ? "placing order..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

interface Request {
  formData: () => Promise<Map<string, string>>;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.items),
  };
  const errors = {};

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
