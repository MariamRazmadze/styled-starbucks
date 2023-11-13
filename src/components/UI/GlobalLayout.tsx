import { Container } from "../../moreStyles/appStyles";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function GlobalLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </Container>
  );
}
