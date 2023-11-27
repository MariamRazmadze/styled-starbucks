import { Link } from "react-router-dom";
import { NavListItem } from "./StyledNav";

export function NavLinks() {
  return (
    <>
      <NavListItem>
        <Link to="/menu">Menu</Link>
      </NavListItem>
      <NavListItem>
        <Link to="/rewards">Rewards</Link>
      </NavListItem>
      <NavListItem>
        <Link to="/gift">Gift Cards</Link>
      </NavListItem>
    </>
  );
}
