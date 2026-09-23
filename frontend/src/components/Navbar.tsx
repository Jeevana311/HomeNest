import { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUser = getCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  const getNavLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => {
    return isActive ? "nav-link active" : "nav-link";
  };

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
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

      <button
        type="button"
        className="navbar-menu-toggle"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Right Side Actions */}
      <div className="main-navbar-actions">
        {isLoggedIn ? (
          <>
            {showAccount && (
              <button
                type="button"
                className="navbar-account-link"
                onClick={() => navigateTo("/account")}
              >
                Account
              </button>
            )}

            {showListProperty && (
              <button
                type="button"
                className="navbar-list-property"
                onClick={() => navigateTo("/list-property")}
              >
                List Property
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            className="navbar-login-button"
            onClick={() => navigateTo("/login")}
          >
            Login
          </button>
        )}
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navbar-menu"
          aria-label="Mobile navigation"
        >
          <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/properties" onClick={() => setIsMenuOpen(false)}>
            Properties
          </NavLink>
          <NavLink to="/project-documentation" onClick={() => setIsMenuOpen(false)}>
            Project Documentation
          </NavLink>
          <NavLink to="/new-projects" onClick={() => setIsMenuOpen(false)}>
            New Projects
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
              Favorites
            </NavLink>
          )}
          {isLoggedIn && showAccount && (
            <button type="button" onClick={() => navigateTo("/account")}>
              Account
            </button>
          )}
          {isLoggedIn && showListProperty && (
            <button type="button" onClick={() => navigateTo("/list-property")}>
              List Property
            </button>
          )}
          {!isLoggedIn && (
            <button type="button" onClick={() => navigateTo("/login")}>
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;