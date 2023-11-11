import { useState } from "react";
import Modal from "../UI/Modal";
import {
  Nav,
  NavbarContainer,
  NavbarLeft,
  NavbarRight,
  NavListItem,
  NavbarBrand,
} from "./StyledNav";
import { LightButton, DarkButton } from "../UI/Button";
import { HamburgerButton, MobileMenu } from "./HamburgerMenu";
import { Link } from "react-router-dom";
import Logo from "../../assets/navbar/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((is) => !is);
  };
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavbarBrand>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </NavbarBrand>

          <NavbarLeft>
            <NavListItem>
              <Link to="/menu">Menu</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/rewards">Rewards</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/quiz">Coffee Quiz</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/gift">Gift Cards</Link>
            </NavListItem>
          </NavbarLeft>

          <NavbarRight>
            <NavListItem>
              <Link to="/store-locator">
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
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/login">
                <LightButton>Log in </LightButton>
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/register">
                <DarkButton>Join Now </DarkButton>
              </Link>
            </NavListItem>
          </NavbarRight>
          {/* burger menu */}
          <HamburgerButton type="button" onClick={toggleMenu} $isOpen={isOpen}>
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </HamburgerButton>
        </NavbarContainer>

        {isOpen && (
          <Modal>
            <MobileMenu $isOpen={isOpen}>
              <ul>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/rewards">Rewards</Link>
                </li>
                <li>
                  <Link to="/quiz">Coffee Quiz</Link>
                </li>
                <li>
                  <Link to="/gift">Gift Cards</Link>
                </li>
              </ul>
              <div>
                <Link to="/login">
                  <LightButton>Log in </LightButton>
                </Link>

                <Link to="/register">
                  <DarkButton>Join Now </DarkButton>
                </Link>

                <div>
                  <Link to="/store-locator">
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
                  </Link>
                </div>
              </div>
            </MobileMenu>
          </Modal>
        )}
      </Nav>
    </>
  );
}
