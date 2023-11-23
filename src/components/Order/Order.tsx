import { useFetcher, useLoaderData } from "react-router-dom";

import OrderItem from "./OrderItem";

import { getOrder } from "../../services/coffeeApi";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";

export interface OrderItemType {
  id: number;
  coffee_id: number;
  order_id: number;
  name: string;
  quantity: number;
  size: string;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  id_number: string;
  total_price: string;
  items: OrderItemType[];
}

function Order() {
  const order = useLoaderData() as Order;
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  const { id, total_price, items } = order;

  const estimatedDelivery = new Date(Date.now() + 30 * 60000).toISOString();

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const status = deliveryIn > 0 ? "Delivering" : "Delivered";

  return (
    <div>
      <div>
        <h2>Order #{id} status</h2>

        <div>
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Your order will arrive in ${calcMinutesLeft(
                estimatedDelivery
              )} minutes`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul>
        {items.map((item) => (
          <OrderItem item={item} key={item.coffee_id} />
        ))}
      </ul>

      <div>
        <p>To pay on Delivery: {formatCurrency(total_price)}</p>
      </div>
    </div>
  );
}

interface Params {
  orderId: string;
}

export async function loader({ params }: { params: Params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
