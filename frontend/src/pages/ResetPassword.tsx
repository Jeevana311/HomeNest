import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./ResetPassword.css";

type RegisteredUser = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
};

function ResetPassword() {
  const navigate = useNavigate();

  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem(
      "homeNestPasswordResetEmail"
    );

    if (!storedEmail) {
      navigate("/forgot-password", {
        replace: true,
      });
      return;
    }

    setResetEmail(storedEmail);
  }, [navigate]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = getRegisteredUsers();

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        resetEmail.toLowerCase()
    );

    if (!matchedUser) {
      setError(
        "The account could not be found. Please restart the password reset process."
      );
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === matchedUser.id
        ? {
            ...user,
            password: newPassword,
          }
        : user
    );

    localStorage.setItem(
      "homeNestUsers",
      JSON.stringify(updatedUsers)
    );

    localStorage.removeItem("homeNestCurrentUser");
    sessionStorage.removeItem("homeNestCurrentUser");
    sessionStorage.removeItem("homeNestPasswordResetEmail");

    setSuccess(true);
  };

  if (success) {
    return (
      <main className="reset-password-page">
        <section className="reset-password-card">
          <div className="reset-success-icon">
            ✓
          </div>

          <h1>Password Updated</h1>

          <p className="reset-description">
            Your password has been changed
            successfully. Login again using
            your new password.
          </p>

          <button
            type="button"
            className="reset-primary-button"
            onClick={() =>
              navigate("/login", {
                replace: true,
              })
            }
          >
            Go to Login
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="reset-password-page">
      <section
        className="reset-password-card"
        aria-labelledby="reset-title"
      >
        <div className="reset-logo">
          <span>⌂</span>
          HomeNest
        </div>

        <h1 id="reset-title">
          Reset Password
        </h1>

        <p className="reset-description">
          Create a new password for{" "}
          <strong>{resetEmail}</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="reset-form-group">
            <label htmlFor="newPassword">
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setError("");
              }}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="reset-form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setError("");
              }}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="reset-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="reset-primary-button"
          >
            Reset Password
          </button>
        </form>

        <div className="reset-back-link">
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

export default ResetPassword;
