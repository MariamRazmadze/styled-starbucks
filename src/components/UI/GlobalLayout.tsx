import { Container } from "../../moreStyles/appStyles";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <Container>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
}
