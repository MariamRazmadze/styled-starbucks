import styled from "styled-components";

export const Nav = styled.nav`
  list-style: none;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 2px 2px rgb(0 0 0 / 6%),
    0 0 2px rgb(0 0 0 /7%);
  font-size: 14px;
`;

export const NavbarBrand = styled.div`
  @media (max-width: 768px) {
    img {
      width: 40px;
    }
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavbarLeft = styled.ul`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  flex: 1;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavbarRight = styled.ul`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
  li:first-child a {
    display: flex;
    align-items: center;
  }
  li:nth-child(2) {
    margin: 0 5px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavListItem = styled.li`
  margin: 0 15px;
  font-weight: 700;
  svg {
    margin-right: 10px;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
  &:hover {
    svg {
      fill: ${({ theme }) => theme.primaryColor};
    }
  }
`;
