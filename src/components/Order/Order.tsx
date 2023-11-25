import { useFetcher, useLoaderData } from "react-router-dom";
import { LoaderFunctionArgs } from "react-router";
import OrderItem from "./OrderItem";

import { getOrder } from "../../services/coffeeApi";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect, useState } from "react";
import {
  StyledOrder,
  OrderContainer,
  OrderWrapper,
  OrderHeader,
  EstimatedP,
  OrderStatus,
  OrderCart,
  OrderCartHeader,
  OrderBackToMenu,
} from "./StyledOrder";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../../assets/navbar/logo.svg";

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

  const [estimatedDelivery] = useState(
    new Date(Date.now() + 30 * 60000).toISOString()
  );

  const [minutesLeft, setMinutesLeft] = useState(
    calcMinutesLeft(estimatedDelivery)
  );
  const status = minutesLeft > 0 ? "Delivering" : "Delivered";
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesLeft((prevMinutesLeft) => prevMinutesLeft - 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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
      <OrderWrapper>
        <OrderHeader>
          <h2>Order #{id} </h2>

          <OrderStatus>Status: {status} order</OrderStatus>
        </OrderHeader>

        <OrderContainer>
          <p>
            {minutesLeft >= 0
              ? `Your order will arrive in ${minutesLeft} minutes`
              : "Order should have arrived"}
          </p>
          <EstimatedP>
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </EstimatedP>
        </OrderContainer>

        <OrderCart>
          {items.map((item) => (
            <OrderItem item={item} key={item.coffee_id} />
          ))}
        </OrderCart>

        <OrderContainer>
          <p>To pay on Delivery: {formatCurrency(total_price)}</p>
        </OrderContainer>
      </OrderWrapper>
    </StyledOrder>
  );
}

interface Params {
  orderId: string;
}

export async function loader({ params }: LoaderFunctionArgs<Params>) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
