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
  color: #000000de;
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



.custom-nav{
  border-bottom: 1px solid #dbd9d7;
  background-color:#f9f9f9;
  padding-left: 125px;
  width:100%;
  margin:0;
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.14);
  margin-top:-4.8rem;
}

.nav-item{
 font-size:1.3rem;
 line-height:1.5rem;
  padding:1.6rem;
}

.nav-underline .nav-link.active, 
.nav-underline .nav-link{
  color: rgba(0,0,0,.87);
}

.flex-column {
  max-width:200px;
}

.flex-column a{
  font-size:16px;
  line-height:24px;;
  padding:1rem;
  color: rgba(0,0,0,.58);
  text-decoration:none;
}



@media (max-width: 768px) {
  .custom-nav{
    padding-left:10px;
  }
  }

`;

export default GlobalStyles;
