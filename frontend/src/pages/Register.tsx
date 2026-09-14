import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { registerUser } from "../utils/api";

import "./Register.css";

function Register() {
  const navigate =
    useNavigate();

  const [
    fullName,
    setFullName,
  ] =
    useState("");

  const [
    phoneNumber,
    setPhoneNumber,
  ] =
    useState("");

  const [
    email,
    setEmail,
  ] =
    useState("");

  const [
    password,
    setPassword,
  ] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] =
    useState("");

  const [
    agreeTerms,
    setAgreeTerms,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  const handleSubmit = async (
    event:
      FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanName =
      fullName.trim();

    const cleanPhone =
      phoneNumber.trim();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    if (
      !cleanName ||
      !cleanPhone ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please complete all required fields."
      );

      return;
    }

    if (
      password.length < 6
    ) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    if (!agreeTerms) {
      setError(
        "Please accept the Terms & Conditions."
      );

      return;
    }

    try {
      await registerUser({
        fullName: cleanName,
        phoneNumber: cleanPhone,
        email: cleanEmail,
        password,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to register right now."
      );
      return;
    }

    alert(
      "Registration successful. Please login."
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };

  const handleGoogleRegister =
    () => {
      alert(
        "Google registration will be connected later."
      );
    };

  const handleFacebookRegister =
    () => {
      alert(
        "Facebook registration will be connected later."
      );
    };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">
          Create Your{" "}
          <span>
            Account
          </span>
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div className="register-form-group">
            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={
                fullName
              }
              onChange={(
                event
              ) => {
                setFullName(
                  event.target
                    .value
                );

                setError("");
              }}
              autoComplete="name"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="phoneNumber">
              Phone Number
            </label>

            <input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={
                phoneNumber
              }
              onChange={(
                event
              ) => {
                setPhoneNumber(
                  event.target
                    .value
                );

                setError("");
              }}
              autoComplete="tel"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="registerEmail">
              Email Address
            </label>

            <input
              id="registerEmail"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(
                event
              ) => {
                setEmail(
                  event.target
                    .value
                );

                setError("");
              }}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="registerPassword">
              Password
            </label>

            <input
              id="registerPassword"
              type="password"
              placeholder="Create Password"
              value={
                password
              }
              onChange={(
                event
              ) => {
                setPassword(
                  event.target
                    .value
                );

                setError("");
              }}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(
                event
              ) => {
                setConfirmPassword(
                  event.target
                    .value
                );

                setError("");
              }}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p
              style={{
                margin:
                  "0 0 14px",
                color:
                  "#dc2626",
                fontSize:
                  "14px",
              }}
            >
              {error}
            </p>
          )}

          <label className="terms">
            <input
              type="checkbox"
              checked={
                agreeTerms
              }
              onChange={(
                event
              ) => {
                setAgreeTerms(
                  event.target
                    .checked
                );

                setError("");
              }}
            />

            <span>
              I agree to the{" "}
              <Link to="/terms">
                Terms &
                Conditions
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>

          <div className="register-divider">
            <span />

            <p>OR</p>

            <span />
          </div>

          <div className="register-social">
            <button
              type="button"
              className="register-social-button"
              onClick={
                handleGoogleRegister
              }
            >
              Google
            </button>

            <button
              type="button"
              className="register-social-button"
              onClick={
                handleFacebookRegister
              }
            >
              Facebook
            </button>
          </div>

          <div className="login-section">
            <p>
              Already have an
              account?
            </p>

            <Link to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;