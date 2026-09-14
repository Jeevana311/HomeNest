import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="main-footer-content">
        <div className="footer-brand-section">
          <Link to="/" className="footer-logo">
            <span>⌂</span>
            HomeNest
          </Link>

          <p>
            A simple real-estate marketplace for discovering, shortlisting,
            buying, renting and listing properties across Guntur,
            Vijayawada and Tenali.
          </p>
        </div>

        <div className="footer-column">
          <h3>Properties</h3>

          <Link to="/properties?mode=buy">
            Buy
          </Link>

          <Link to="/properties?mode=rent">
            Rent
          </Link>

          <Link to="/properties?category=residential">
            Residential
          </Link>

          <Link to="/properties?category=commercial">
            Commercial
          </Link>

          <Link to="/properties?category=land">
            Plots & Land
          </Link>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/new-projects">
            New Projects
          </Link>

          <Link to="/favorites">
            Favorites
          </Link>

          <Link to="/properties?category=industrial">
            Industrial
          </Link>

          <Link to="/properties?category=rental">
            Rental & PG
          </Link>

          <Link to="/list-property">
            List Property
          </Link>
        </div>

        <div className="footer-column">
          <h3>Locations</h3>

          <Link to="/properties?location=Guntur">
            Guntur
          </Link>

          <Link to="/properties?location=Vijayawada">
            Vijayawada
          </Link>

          <Link to="/properties?location=Tenali">
            Tenali
          </Link>
        </div>

        <div className="footer-column">
          <h3>Company</h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/faq">
            FAQs
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="main-footer-bottom">
        <p>
          © 2026 HomeNest. All rights reserved.
        </p>

        <p>
          Find your next place with HomeNest.
        </p>
      </div>
    </footer>
  );
}

export default Footer;