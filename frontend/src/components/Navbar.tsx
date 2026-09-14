import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/authStorage";
import "./Navbar.css";

type NavbarProps = {
  showListProperty?: boolean;
  showAccount?: boolean;
};

function Navbar({
  showListProperty = true,
  showAccount = true,
}: NavbarProps) {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  const getNavLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => {
    return isActive ? "nav-link active" : "nav-link";
  };

  return (
    <header className="main-navbar">
      {/* Logo */}
      <NavLink to="/" className="main-navbar-logo">
        <span>⌂</span>
        HomeNest
      </NavLink>

      {/* Main Navigation */}
      <nav className="main-navbar-links">
        <NavLink
          to="/"
          end
          className={getNavLinkClass}
        >
          Home
        </NavLink>

        <NavLink
          to="/properties"
          className={getNavLinkClass}
        >
          Properties
        </NavLink>

        <NavLink
          to="/project-documentation"
          className={getNavLinkClass}
        >
          Project Documentation
        </NavLink>

        <NavLink
          to="/new-projects"
          className={getNavLinkClass}
        >
          New Projects
        </NavLink>

        <NavLink
          to="/about"
          className={getNavLinkClass}
        >
          About Us
        </NavLink>

        <NavLink
          to="/contact"
          className={getNavLinkClass}
        >
          Contact Us
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="/favorites"
            className={getNavLinkClass}
          >
            Favorites
          </NavLink>
        )}
      </nav>

      {/* Right Side Actions */}
      <div className="main-navbar-actions">
        {isLoggedIn ? (
          <>
            {showAccount && (
              <button
                type="button"
                className="navbar-account-link"
                onClick={() => navigate("/account")}
              >
                Account
              </button>
            )}

            {showListProperty && (
              <button
                type="button"
                className="navbar-list-property"
                onClick={() =>
                  navigate("/list-property")
                }
              >
                List Property
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            className="navbar-login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;