import styled from "styled-components";
import { useNavigate, useRouteError } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const ErrorIcon = styled(MdErrorOutline)`
  color: ${({ theme }) => theme.redAccent};
  font-size: 4rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.redAccent};
`;

const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  color: white;
  background-color: ${({ theme }) => theme.greenAccent};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

const GoBackIcon = styled(IoIosArrowBack)`
  margin-right: 0.5rem;
`;

export default function ErrorText() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <ErrorContainer>
      <ErrorIcon />
      <h1>Something went wrong...</h1>
      <ErrorMessage>
        {error instanceof Error ? error.message : String(error)}
      </ErrorMessage>
      <GoBackButton onClick={() => navigate(-1)}>
        <GoBackIcon />
        Go Back
      </GoBackButton>
    </ErrorContainer>
  );
}
