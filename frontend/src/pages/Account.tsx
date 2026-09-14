import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { clearApiSession } from "../utils/api";

import "./Account.css";

type UserProfile = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
};

type RegisteredUser = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  city?: string;
  createdAt: string;
};

type CurrentUser = {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  city?: string;
};

type SessionType =
  | "local"
  | "session"
  | null;

function Account() {
  const navigate =
    useNavigate();

  const sessionData =
    getCurrentUser();

  const initialProfile =
    createProfile(
      sessionData.user
    );

  const [
    profile,
    setProfile,
  ] =
    useState<UserProfile>(
      initialProfile
    );

  const [
    savedProfile,
    setSavedProfile,
  ] =
    useState<UserProfile>(
      initialProfile
    );

  const [
    editProfile,
    setEditProfile,
  ] =
    useState(false);

  const handleChange = (
    event:
      ChangeEvent<
        | HTMLInputElement
        | HTMLSelectElement
      >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setProfile(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const handleSaveProfile = (
    event: FormEvent
  ) => {
    event.preventDefault();

    const cleanName =
      profile.fullName.trim();

    const cleanEmail =
      profile.email
        .trim()
        .toLowerCase();

    const cleanPhone =
      profile.phone.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone
    ) {
      alert(
        "Please complete all required fields."
      );

      return;
    }

    const users =
      getRegisteredUsers();

    const duplicateEmail =
      users.some(
        (user) =>
          user.id !==
            profile.id &&
          user.email
            .toLowerCase() ===
            cleanEmail
      );

    if (
      duplicateEmail
    ) {
      alert(
        "Another account already uses this email address."
      );

      return;
    }

    const updatedProfile:
      UserProfile = {
      ...profile,

      fullName:
        cleanName,

      email:
        cleanEmail,

      phone:
        cleanPhone,
    };

    const updatedUsers =
      users.map(
        (user) => {
          if (
            user.id !==
            profile.id
          ) {
            return user;
          }

          return {
            ...user,

            fullName:
              cleanName,

            email:
              cleanEmail,

            phoneNumber:
              cleanPhone,

            city:
              profile.city,
          };
        }
      );

    localStorage.setItem(
      "homeNestUsers",
      JSON.stringify(
        updatedUsers
      )
    );

    const updatedCurrentUser:
      CurrentUser = {
      id:
        profile.id,

      fullName:
        cleanName,

      email:
        cleanEmail,

      phoneNumber:
        cleanPhone,

      city:
        profile.city,
    };

    updateCurrentSession(
      updatedCurrentUser,
      sessionData.sessionType
    );

    setProfile(
      updatedProfile
    );

    setSavedProfile(
      updatedProfile
    );

    setEditProfile(
      false
    );

    alert(
      "Profile updated successfully."
    );
  };

  const handleCancel =
    () => {
      setProfile(
        savedProfile
      );

      setEditProfile(
        false
      );
    };

  const handleLogout =
    () => {
      const confirmed =
        window.confirm(
          "Are you sure you want to logout?"
        );

      if (!confirmed) {
        return;
      }

      clearApiSession();

      navigate(
        "/login",
        {
          replace: true,
        }
      );
    };

  return (
    <div className="account-page">
      <Navbar />

      <main className="account-main">
        <section className="account-header">
          <div>
            <span className="account-eyebrow">
              MY ACCOUNT
            </span>

            <h1>
              Welcome,{" "}
              {
                savedProfile.fullName
              }
            </h1>

            <p>
              Manage your
              profile, saved
              properties,
              listings,
              enquiries and
              scheduled visits.
            </p>
          </div>

          <button
            type="button"
            className="account-logout-button"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>
        </section>

        <section className="account-dashboard-grid">
          <article
            className="account-stat-card"
            onClick={() =>
              navigate(
                "/favorites"
              )
            }
          >
            <div className="account-stat-icon">
              ♡
            </div>

            <div>
              <span>
                Favorites
              </span>

              <strong>
                View Saved
                Properties
              </strong>
            </div>
          </article>

          <article
            className="account-stat-card"
            onClick={() =>
              navigate(
                "/my-listings"
              )
            }
          >
            <div className="account-stat-icon">
              ⌂
            </div>

            <div>
              <span>
                My Listings
              </span>

              <strong>
                Manage Your
                Properties
              </strong>
            </div>
          </article>

          <article
            className="account-stat-card"
            onClick={() =>
              navigate(
                "/my-enquiries"
              )
            }
          >
            <div className="account-stat-icon">
              ✉
            </div>

            <div>
              <span>
                My Enquiries
              </span>

              <strong>
                Check Your
                Enquiries
              </strong>
            </div>
          </article>

          <article
            className="account-stat-card"
            onClick={() =>
              navigate(
                "/scheduled-visits"
              )
            }
          >
            <div className="account-stat-icon">
              ◷
            </div>

            <div>
              <span>
                Scheduled Visits
              </span>

              <strong>
                View Property
                Visits
              </strong>
            </div>
          </article>
        </section>

        <section className="account-content-grid">
          <div className="account-profile-card">
            <div className="account-card-header">
              <div>
                <span className="account-eyebrow teal">
                  PROFILE
                </span>

                <h2>
                  Personal
                  Information
                </h2>

                <p>
                  Keep your
                  contact
                  information
                  up to date.
                </p>
              </div>

              {!editProfile && (
                <button
                  type="button"
                  className="account-edit-button"
                  onClick={() =>
                    setEditProfile(
                      true
                    )
                  }
                >
                  Edit Profile
                </button>
              )}
            </div>

            {!editProfile ? (
              <div className="account-profile-details">
                <div className="account-profile-avatar">
                  {savedProfile
                    .fullName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="account-profile-info">
                  <div>
                    <span>
                      Full Name
                    </span>

                    <strong>
                      {
                        savedProfile.fullName
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Email Address
                    </span>

                    <strong>
                      {
                        savedProfile.email
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Phone Number
                    </span>

                    <strong>
                      {
                        savedProfile.phone
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      City
                    </span>

                    <strong>
                      {
                        savedProfile.city
                      }
                    </strong>
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="account-edit-form"
                onSubmit={
                  handleSaveProfile
                }
              >
                <div className="account-form-grid">
                  <div className="account-field">
                    <label htmlFor="fullName">
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      value={
                        profile.fullName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="account-field">
                    <label htmlFor="email">
                      Email Address
                      *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={
                        profile.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="account-field">
                    <label htmlFor="phone">
                      Phone Number
                      *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={
                        profile.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="account-field">
                    <label htmlFor="city">
                      City
                    </label>

                    <select
                      id="city"
                      name="city"
                      value={
                        profile.city
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="Guntur">
                        Guntur
                      </option>

                      <option value="Vijayawada">
                        Vijayawada
                      </option>

                      <option value="Tenali">
                        Tenali
                      </option>
                    </select>
                  </div>
                </div>

                <div className="account-form-actions">
                  <button
                    type="button"
                    className="account-cancel-button"
                    onClick={
                      handleCancel
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="account-save-button"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="account-side-panel">
            <span className="account-eyebrow teal">
              QUICK ACTIONS
            </span>

            <h2>
              Property Actions
            </h2>

            <p>
              Quickly access the
              most common
              HomeNest features.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/properties"
                )
              }
            >
              <span>⌕</span>

              <div>
                <strong>
                  Browse
                  Properties
                </strong>

                <small>
                  Find properties
                  to buy or rent
                </small>
              </div>

              <b>›</b>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/list-property"
                )
              }
            >
              <span>＋</span>

              <div>
                <strong>
                  List Property
                </strong>

                <small>
                  Add a property
                  for sale or
                  rent
                </small>
              </div>

              <b>›</b>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/new-projects"
                )
              }
            >
              <span>▦</span>

              <div>
                <strong>
                  New Projects
                </strong>

                <small>
                  Explore
                  upcoming
                  developments
                </small>
              </div>

              <b>›</b>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/favorites"
                )
              }
            >
              <span>♡</span>

              <div>
                <strong>
                  Favorites
                </strong>

                <small>
                  View
                  shortlisted
                  properties
                </small>
              </div>

              <b>›</b>
            </button>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function getCurrentUser(): {
  user: CurrentUser | null;
  sessionType:
    SessionType;
} {
  const localUser =
    localStorage.getItem(
      "homeNestCurrentUser"
    );

  if (localUser) {
    try {
      return {
        user:
          JSON.parse(
            localUser
          ) as CurrentUser,

        sessionType:
          "local",
      };
    } catch {
      localStorage.removeItem(
        "homeNestCurrentUser"
      );
    }
  }

  const sessionUser =
    sessionStorage.getItem(
      "homeNestCurrentUser"
    );

  if (sessionUser) {
    try {
      return {
        user:
          JSON.parse(
            sessionUser
          ) as CurrentUser,

        sessionType:
          "session",
      };
    } catch {
      sessionStorage.removeItem(
        "homeNestCurrentUser"
      );
    }
  }

  return {
    user: null,
    sessionType: null,
  };
}

function createProfile(
  user: CurrentUser | null
): UserProfile {
  if (!user) {
    return {
      id: 0,
      fullName: "",
      email: "",
      phone: "",
      city: "Guntur",
    };
  }

  const registeredUsers =
    getRegisteredUsers();

  const registeredUser =
    registeredUsers.find(
      (item) =>
        item.id ===
        user.id
    );

  return {
    id:
      user.id,

    fullName:
      user.fullName ||
      registeredUser?.fullName ||
      "",

    email:
      user.email ||
      registeredUser?.email ||
      "",

    phone:
      user.phoneNumber ||
      registeredUser?.phoneNumber ||
      "",

    city:
      user.city ||
      registeredUser?.city ||
      "Guntur",
  };
}

function getRegisteredUsers():
  RegisteredUser[] {
  const stored =
    localStorage.getItem(
      "homeNestUsers"
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored
    ) as RegisteredUser[];
  } catch {
    return [];
  }
}

function updateCurrentSession(
  user: CurrentUser,
  sessionType:
    SessionType
) {
  if (
    sessionType ===
    "local"
  ) {
    localStorage.setItem(
      "homeNestCurrentUser",
      JSON.stringify(
        user
      )
    );

    sessionStorage.removeItem(
      "homeNestCurrentUser"
    );

    return;
  }

  if (
    sessionType ===
    "session"
  ) {
    sessionStorage.setItem(
      "homeNestCurrentUser",
      JSON.stringify(
        user
      )
    );

    localStorage.removeItem(
      "homeNestCurrentUser"
    );

    return;
  }

  sessionStorage.setItem(
    "homeNestCurrentUser",
    JSON.stringify(
      user
    )
  );
}

export default Account;