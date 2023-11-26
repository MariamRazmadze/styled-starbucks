import { Link } from "react-router-dom";
import Logo from "../../assets/navbar/logo.svg";
import { StyledNavbarBrand } from "./StyledNav";

export function NavbarBrand() {
  return (
    <StyledNavbarBrand>
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
    </StyledNavbarBrand>
  );
}
