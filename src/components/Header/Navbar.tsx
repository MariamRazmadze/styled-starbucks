import { useState } from "react";
import {
  Nav,
  NavbarContainer,
  NavbarLeft,
  NavbarRight,
  NavListItem,
  NavIcon,
} from "./StyledNav";
import { LightButton, DarkButton } from "../UI/Button";
import { ModalContent } from "./ModalContent";
import { Link } from "react-router-dom";
import { NavbarBrand } from "./NavbarBrand";
import { useSelector } from "react-redux";
import { FaUserNinja } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { LogoutButton } from "./StyledNav";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/authSlice";
import GlobalStyles from "../../moreStyles/GlobalStyles";
import { NavLinks } from "./NavLinks";
import { ModalButton } from "./ModalButton";
import { NavbarModal } from "./NavbarModal";

export interface Store {
  user: {
    token: string | null;
    isLoggedIn: boolean;
    tokenExpirationTime: string | null;
    isRegistered: boolean;
    username: string | null;
  };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state: Store) => state.user.isLoggedIn);

  const toggleMenu = () => {
    setIsOpen((is) => !is);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <GlobalStyles modalOpen={isOpen} />
      <Nav>
        <NavbarContainer>
          <NavbarBrand />
          <NavbarLeft>
            <NavLinks />
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
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                <NavListItem>
                  <Link to="/user">
                    <NavIcon>
                      <FaUserNinja />
                    </NavIcon>
                  </Link>
                </NavListItem>
                <NavListItem>
                  <LogoutButton type="button" onClick={logoutHandler}>
                    <NavIcon>
                      <IoMdLogOut />
                    </NavIcon>
                  </LogoutButton>
                </NavListItem>
              </>
            )}
          </NavbarRight>
          <ModalButton onClick={toggleMenu} $isOpen={isOpen} />
        </NavbarContainer>

        {isOpen && (
          <NavbarModal isOpen={isOpen} onRequestClose={toggleMenu}>
            <ModalContent isOpen={isOpen} toggleMenu={toggleMenu} />
          </NavbarModal>
        )}
      </Nav>
    </>
  );
}
