import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.div`
  flex-basis: 56rem;
  background-color: white;
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 4.8rem);
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Outlet />
    </StyledSidebar>
  );
}
