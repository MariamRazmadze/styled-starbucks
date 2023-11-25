import { formatCurrency } from "../../utils/helpers";
import { OrderItemType } from "./Order";
import Card from "../UI/Card";
import { CardP, CardTotal } from "./StyledOrder";

function OrderItem({ item }: { item: OrderItemType }) {
  const { quantity, name, total_price, size } = item;

  return (
    <Card>
      <div>
        <CardP>
          <span>{quantity}&times;</span> {name}
        </CardP>
        <CardP>
          <span>Size: {size}</span>
        </CardP>
        <CardTotal>{formatCurrency(total_price)}</CardTotal>
      </div>
    </Card>
  );
}

export default OrderItem;
