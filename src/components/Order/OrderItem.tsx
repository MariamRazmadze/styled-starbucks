import { formatCurrency } from "../../utils/helpers";
import { OrderItemType } from "./Order";

function OrderItem({ item }: { item: OrderItemType }) {
  const { quantity, name, total_price } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(total_price)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
