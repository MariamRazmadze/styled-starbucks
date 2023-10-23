import { accordionData } from "../../data/accordionData";
import { Accordion } from "./Accordion";
import SocialIcons from "./SocialIcons";
import styled from "styled-components";

const StyledFooterContainer = styled.div`
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1), 0 -2px 2px rgba(0, 0, 0, 0.06),
    0 0 2px rgba(0, 0, 0, 0.07);
  width: 100%;
  padding: 4rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;
export default function Footer() {
  return (
    <StyledFooterContainer>
      <Accordion data={accordionData} />
      <SocialIcons />
    </StyledFooterContainer>
  );
}
