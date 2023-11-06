import styled from "styled-components";

const StyledMessage = styled.p`
  text-align: center;
  font-size: 1.8rem;
  width: 80%;
  margin: 2rem auto;
  font-weight: 600;
`;

interface MessageProps {
  message: string;
}

function Message({ message }: MessageProps) {
  return <StyledMessage>{message}</StyledMessage>;
}

export default Message;
