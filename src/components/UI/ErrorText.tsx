import styled from "styled-components";

const StyledError = styled.p`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem;
  background-color: red;
  border-radius: 100px;
`;

export default function ErrorText() {
  return <StyledError>There was an error fecthing data.</StyledError>;
}
