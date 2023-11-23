import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const EditButton = styled.button`
  font-size: 28px;
  color: #00000094;
  background: transparent;
  border: none;
  outline: none;
`;

const EditContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

interface EditProps {
  coffeeId: number;
}
export default function UpdateQuantity({ coffeeId }: EditProps) {
  const dispatch = useDispatch();
  return (
    <EditContainer>
      <EditButton>
        <MdOutlineModeEdit />
      </EditButton>
      <EditButton onClick={() => dispatch(decreaseItemQuantity(coffeeId))}>
        <CiCircleMinus />
      </EditButton>
      <EditButton onClick={() => dispatch(increaseItemQuantity(coffeeId))}>
        <CiCirclePlus />
      </EditButton>
    </EditContainer>
  );
}
