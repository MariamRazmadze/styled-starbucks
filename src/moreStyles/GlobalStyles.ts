import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  overflow-x: hidden;
}

body {
  font-family: "Open Sans", sans-serif;
  color: black;
  font-weight: 400;
  line-height: 1.4;
  min-height: 100vh;
  padding-bottom: 6rem;
  overflow-x: hidden;

}


a {
  color: #000000;
}

ul {
  list-style: none;
  margin-bottom: 0;
}

ul * {
  text-decoration: none;
}


p {
  margin: 5px 0;
  line-height: 1.7;
}

.error {
  border-color: red;
}
.error label {
  color: red;
}

.error-message {
  color: red;
}


`;

export default GlobalStyles;
