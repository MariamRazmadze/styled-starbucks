import styled from "styled-components";
import { StyledCart } from "../Cart/StyledCart";

export const StyledOrder = styled(StyledCart)`
  display: flex;
  justify-content: center;
  padding-top: 10%;
  background-color: #f9f9f9;
`;

export const OrderInput = styled.input`
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.houseGreen};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease-out;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.houseGreen};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.greenAccent};
  }

  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

export const InputsContainer = styled.div`
  width: 500px;
`;
