import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { login, register } from "./authSlice";
import { AppDispatch } from "../../store";

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
const Auth = ({ defaultIsLogin }: AuthFormProps) => {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!enteredUsername || !enteredPassword) {
      console.error("Username or password is missing");
      return;
    }
    if (isLogin) {
      dispatch(
        login({ username: enteredUsername, password: enteredPassword })
      ).then((res) => {
        if (login.fulfilled.match(res)) {
          localStorage.setItem("username", enteredUsername);
          navigate("/");
        } else if (login.rejected.match(res)) {
          setError(true);
          setErrorMessage(res.error.message || "An error occurred");
        }
      });
    } else {
      dispatch(
        register({ username: enteredUsername, password: enteredPassword })
      ).then((res) => {
        if (register.fulfilled.match(res)) {
          localStorage.setItem("username", enteredUsername);

          navigate("/");
        } else if (register.rejected.match(res)) {
          setError(true);
          setErrorMessage(res.error.message || "An error occurred");
        }
      });
    }
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
            className={`mb-3 ${error ? "error" : ""}`}
          >
            <Form.Control
              type="text"
              placeholder="Username or email address"
              ref={usernameInputRef}
              minLength={3}
              required
              className={error ? "error" : ""}
            />
            {error && <div className="error-message">{errorMessage}</div>}
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label={
              <>
                <Star>*</Star> Password
              </>
            }
            className={error ? "error" : ""}
          >
            <Form.Control
              type="password"
              placeholder="Password"
              minLength={5}
              required
              ref={passwordInputRef}
              className={error ? "error" : ""}
            />
            {error && <div className="error-message">{errorMessage}</div>}
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

export default Auth;
