import styled from "styled-components";
import { useState } from "react";

const SizeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SizeOptions = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 1rem;
  position: relative;

  &::after {
    background: ${({ theme }) => theme.secondaryBackground};
    border-radius: 12px;
    bottom: 0;
    content: "";
    height: 4px;
    left: 0;
    position: absolute;
    width: 100%;
  }
`;
const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SizeImage = styled.div`
  margin: 0;
`;

const SizeName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const SizeInOz = styled.p`
  font-size: 14px;
  margin: 0;
`;

const RadioButton = styled.input.attrs({ type: "radio" })`
  margin: 1rem;
  appearance: none;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  padding: 2.5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: background-color 1s ease, background-image 2s ease;
  &:checked {
    background-color: ${({ theme }) => theme.secondaryBackground};
    border: 2px solid ${({ theme }) => theme.greenAccent};
  }
`;

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState("Grande");
  const sizes = [
    {
      id: "Short",
      oz: 8,
      image: "/sizes/short.svg",
      activeImage: "/sizes/short-active.svg",
    },
    {
      id: "Tall",
      oz: 12,
      image: "/sizes/tall.svg",
      activeImage: "/sizes/tall-active.svg",
    },
    {
      id: "Grande",
      oz: 16,
      image: "/sizes/grande.svg",
      activeImage: "/sizes/grande-active.svg",
    },
    {
      id: "Venti",
      oz: 20,
      image: "/sizes/venti.svg",
      activeImage: "/sizes/venti-active.svg",
    },
  ];

  return (
    <SizeSelectorContainer>
      <SizeOptions>Size Options</SizeOptions>
      <Form>
        {sizes.map((size) => (
          <Label key={size.id}>
            <RadioButton
              name="size"
              value={size.id}
              checked={selectedSize === size.id}
              style={{
                backgroundImage: `url(${
                  selectedSize === size.id ? size.activeImage : size.image
                })`,
              }}
              onChange={() => setSelectedSize(size.id)}
            />
            <SizeImage />
            <SizeName>{size.id}</SizeName>
            <SizeInOz>{size.oz} fl oz</SizeInOz>
          </Label>
        ))}
      </Form>
    </SizeSelectorContainer>
  );
}
