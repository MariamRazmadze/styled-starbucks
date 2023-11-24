import Modal from "react-modal";
import styled from "styled-components";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const StyledModal = styled(Modal)`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50%;
  background: white;
  border-radius: 10px 10px 0 0;
  display: flex;
  width: 60vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ModalContent = styled.div`
  display: flex;
  max-width: 400px;
  gap: 2rem;
  flex-direction: column;
  a {
    text-decoration: none;
  }
`;

const AuthLink = styled.span`
  color: ${({ theme }) => theme.greenAccent};
  font-size: 28px;
  padding: 7px 16px;
  font-weight: 700;
  border-radius: 50px;
  display: flex;
  align-items: center;
  width: fit-content;
  &:hover {
    background-color: #e9f5f1;
  }
`;

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccess: () => void;
  onCancel: () => void;
}

function LoginModal({ isOpen, onRequestClose }: LoginModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <ModalContent>
        <h2 style={{ fontSize: "16px", paddingLeft: "16px" }}>
          To place an order, you'll need to be a Starbucks® Rewards member
        </h2>
        <Link to="/register">
          <AuthLink>Join now</AuthLink>
        </Link>
        <Link to="/login">
          <AuthLink>Sign in</AuthLink>
        </Link>
      </ModalContent>
    </StyledModal>
  );
}

export default LoginModal;
