import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  children: ReactNode;
}

const Backdrop = styled.div`
  position: fixed;
  top: 10rem;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const StyledModal = styled.dialog`
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow: hidden;
  z-index: 1;
`;

function Modal({ children }: ModalProps) {
  const navigate = useNavigate();
  function closeHandler() {
    navigate("..");
  }
  return (
    <>
      <Backdrop onClick={closeHandler} />
      <StyledModal open>{children}</StyledModal>
    </>
  );
}

export default Modal;
