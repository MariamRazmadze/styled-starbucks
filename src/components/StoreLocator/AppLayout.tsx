import Sidebar from "./Sidebar";
import Map from "./Map";
import styled from "styled-components";

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  overscroll-behavior-y: none;
  display: flex;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function AppLayout() {
  return (
    <Layout>
      <Sidebar />
      <Map />
    </Layout>
  );
}
