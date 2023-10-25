import { useState } from "react";
import {
  Nav,
  NavbarContainer,
  NavbarLeft,
  NavbarRight,
  NavListItem,
  NavbarBrand,
} from "./StyledNav";
import { LightButton, DarkButton } from "../Button";
import { HamburgerButton, MobileMenu } from "./HamburgerMenu";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/navbar/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((is) => !is);
  };
  return (
    <Nav>
      <NavbarContainer>
        <NavbarBrand>
          <NavLink to="/">
            <img src={Logo} alt="logo" />
          </NavLink>
        </NavbarBrand>

        <NavbarLeft>
          <NavListItem>
            <NavLink to="/menu">Menu</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink to="/rewards">Rewards</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink to="/gift">Gift Cards</NavLink>
          </NavListItem>
        </NavbarLeft>

        <NavbarRight>
          <NavListItem>
            <NavLink to="/store-locator">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M12,11.475 C10.5214286,11.475 9.32142857,10.299 9.32142857,8.85 C9.32142857,7.401 10.5214286,6.225 12,6.225 C13.4785714,6.225 14.6785714,7.401 14.6785714,8.85 C14.6785714,10.299 13.4785714,11.475 12,11.475 M12,1.5 C7.85357143,1.5 4.5,4.7865 4.5,8.85 C4.5,14.3625 12,22.5 12,22.5 C12,22.5 19.5,14.3625 19.5,8.85 C19.5,4.7865 16.1464286,1.5 12,1.5"></path>
              </svg>

              <span>Find a store</span>
            </NavLink>
          </NavListItem>
          <NavListItem>
            <LightButton>Sign in</LightButton>
          </NavListItem>
          <NavListItem>
            <DarkButton>Sign in</DarkButton>
          </NavListItem>
        </NavbarRight>
        {/* burger menu */}
        <HamburgerButton type="button" onClick={toggleMenu} $isOpen={isOpen}>
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </HamburgerButton>
      </NavbarContainer>

      <MobileMenu $isOpen={isOpen}>
        <ul>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/rewards">Rewards</NavLink>
          </li>
          <li>
            <NavLink to="/gift">Gift Cards</NavLink>
          </li>
        </ul>
        <div>
          <LightButton>Sign in</LightButton>
          <DarkButton>Join now</DarkButton>

          <div>
            <NavLink to="/store-locator">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M12,11.475 C10.5214286,11.475 9.32142857,10.299 9.32142857,8.85 C9.32142857,7.401 10.5214286,6.225 12,6.225 C13.4785714,6.225 14.6785714,7.401 14.6785714,8.85 C14.6785714,10.299 13.4785714,11.475 12,11.475 M12,1.5 C7.85357143,1.5 4.5,4.7865 4.5,8.85 C4.5,14.3625 12,22.5 12,22.5 C12,22.5 19.5,14.3625 19.5,8.85 C19.5,4.7865 16.1464286,1.5 12,1.5"></path>
              </svg>
              <span>Find a store</span>
            </NavLink>
          </div>
        </div>
      </MobileMenu>
    </Nav>
  );
}
