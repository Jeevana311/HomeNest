import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  clearApiSession,
  loginUser,
} from "../utils/api";

import "./Login.css";

type LocationState = {
  from?: {
    pathname?: string;
    search?: string;
  };
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    clearExistingSession();

    try {
      await loginUser(cleanEmail, password, rememberMe);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to login right now."
      );
      return;
    }

    const state = location.state as LocationState | null;

    const pathname = state?.from?.pathname;
    const search = state?.from?.search || "";

    const destination = pathname
      ? `${pathname}${search}`
      : "/account";

    navigate(destination, {
      replace: true,
    });
  };

  const handleGoogleLogin = () => {
    alert("Google login will be connected later.");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login will be connected later.");
  };

  return (
    <main className="login-page">
      <section
        className="login-card"
        aria-labelledby="login-title"
      >
        <h1
          id="login-title"
          className="login-title"
        >
          Welcome Back to <span>HomeNest</span>
        </h1>

        <p className="welcome-text">
          Login to continue your property journey.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="loginEmail">
              Email Address
            </label>

            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="loginPassword">
              Password
            </label>

            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />

              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

          <div className="login-divider">
            <span />
            <p>OR</p>
            <span />
          </div>

          <div className="social-login">
            <button
              type="button"
              className="social-button"
              onClick={handleGoogleLogin}
            >
              Google
            </button>

            <button
              type="button"
              className="social-button"
              onClick={handleFacebookLogin}
            >
              Facebook
            </button>
          </div>

          <div className="register-section">
            <p>Don&apos;t have an account?</p>

            <Link to="/register">
              Register
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

function clearExistingSession() {
  clearApiSession();
}

export default Login;
