import styled from "styled-components";

export const VideoContainer = styled.div`
  display: flex;
  width: 300px;
  margin-top: 2rem;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  border-radius: 20px;
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.secondaryBackground};
`;

interface ProgressBarFillProps {
  $progress: number;
}
export const ProgressBarFill = styled.div<ProgressBarFillProps>`
  height: 100%;
  background-color: ${({ theme }) => theme.greenAccent};
  width: ${(props) => props.$progress}%;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: top;
  width: 100%;
  padding-bottom: 20px;
`;

export const VideoButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.redAccent};
  font-size: 24px;
`;
