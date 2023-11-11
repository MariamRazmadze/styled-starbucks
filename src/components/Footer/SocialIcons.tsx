import styled from "styled-components";

const StyledIcons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  a {
    margin-right: 20px;
  }
`;

export default function SocialIcons() {
  return (
    <StyledIcons>
      <a href="https://spotify.com">
        <img src="/socials/spotify.svg" alt="spotify" />
      </a>
      <a href="https://facebook.com">
        <img src="/socials/facebook.svg" alt="facebook" />
      </a>
      <a href="https://pinterest.com">
        <img src="/socials/pinterest.svg" alt="pinterest" />
      </a>
      <a href="https://instagram.com">
        <img src="/socials/instagram.svg" alt="instagram" />
      </a>
      <a href="https://youtube.com">
        <img src="/socials/youtube.svg" alt="youtube" />
      </a>
      <a href="https://twitter.com">
        <img src="/socials/twitter.svg" alt="twitter" />
      </a>
    </StyledIcons>
  );
}
