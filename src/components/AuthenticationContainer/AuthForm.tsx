import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate, Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  StyledAuth,
  AuthHeader,
  AuthP,
  AuthPAccent,
  AuthFooter,
  Star,
  Actions,
  WaveButton,
  AuthFooterButton,
} from "./StyledAuth";

type AuthFormProps = {
  defaultIsLogin: boolean;
};

const AuthForm = ({ defaultIsLogin }: AuthFormProps) => {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    setIsLogin(defaultIsLogin);
  }, [defaultIsLogin]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = "https://starbucks.pythonanywhere.com/login";
    } else {
      url = "https://starbucks.pythonanywhere.com/register";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const oneHourFromNow = new Date().getTime() + 60 * 60 * 1000;
        const expirationTime = new Date(oneHourFromNow);

        authCtx.login(data.access_token, expirationTime.toISOString());
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <AuthHeader>Sign in or create an account</AuthHeader>
      <StyledAuth>
        <AuthP>
          <Star>*</Star> indicates required field
        </AuthP>
        <form onSubmit={submitHandler}>
          <FloatingLabel
            controlId="floatingInput"
            label={
              <>
                <Star>*</Star> Username or email address
              </>
            }
            className="mb-3 "
          >
            <Form.Control
              type="text"
              placeholder="Username or email address"
              ref={usernameInputRef}
              minLength={3}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label={
              <>
                <Star>*</Star> Password
              </>
            }
          >
            <Form.Control
              type="password"
              placeholder="Password"
              minLength={5}
              required
              ref={passwordInputRef}
            />
          </FloatingLabel>
          <Actions>
            {!isLoading && (
              <WaveButton>{isLogin ? "Login" : "Create Account"}</WaveButton>
            )}
            {isLoading && <p>Loading...</p>}
          </Actions>
        </form>
      </StyledAuth>
      <AuthFooter>
        <AuthPAccent>JOIN STARBUCKS® REWARDS</AuthPAccent>
        <AuthP>
          Join Starbucks® Rewards to earn free food and drinks, get free
          refills, pay and order with your phone, and more.
        </AuthP>
        <AuthFooterButton type="button" onClick={switchAuthModeHandler}>
          {isLogin ? (
            <Link to="/register">Join now</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </AuthFooterButton>
      </AuthFooter>
    </>
  );
};

export default AuthForm;
