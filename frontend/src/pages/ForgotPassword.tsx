import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./ForgotPassword.css";

type RegisteredUser = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
};

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Please enter your registered email address."
      );
      return;
    }

    const users = getRegisteredUsers();

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === cleanEmail
    );

    if (!matchedUser) {
      setError(
        "No HomeNest account was found with this email address."
      );
      return;
    }

    sessionStorage.setItem(
      "homeNestPasswordResetEmail",
      matchedUser.email
    );

    navigate("/reset-password");
  };

  return (
    <main className="forgot-password-page">
      <section
        className="forgot-password-card"
        aria-labelledby="forgot-title"
      >
        <div className="auth-logo">
          <span>⌂</span>
          HomeNest
        </div>

        <h1 id="forgot-title">
          Forgot Password?
        </h1>

        <p className="auth-description">
          Enter the email address registered
          with your HomeNest account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="forgotEmail">
              Email Address
            </label>

            <input
              id="forgotEmail"
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

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-primary-button"
          >
            Continue
          </button>
        </form>

        <div className="auth-back-link">
          <Link to="/login">
            ← Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}

function getRegisteredUsers(): RegisteredUser[] {
  const stored = localStorage.getItem("homeNestUsers");

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as RegisteredUser[];
  } catch {
    return [];
  }
}

export default ForgotPassword;
