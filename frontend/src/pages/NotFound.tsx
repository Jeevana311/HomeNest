import {
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <Navbar />

      <main className="not-found-main">
        <section
          className="not-found-card"
          aria-labelledby="not-found-title"
        >
          <span className="not-found-code">
            404
          </span>

          <h1 id="not-found-title">
            Page Not Found
          </h1>

          <p>
            The page you are looking for
            does not exist, may have been
            moved, or the address may be
            incorrect.
          </p>

          <div className="not-found-actions">
            <Link
              to="/"
              className="not-found-primary"
            >
              Go to Home
            </Link>

            <Link
              to="/properties"
              className="not-found-secondary"
            >
              Browse Properties
            </Link>
          </div>

          <div className="not-found-help">
            <span>
              Looking for something specific?
            </span>

            <Link to="/contact">
              Contact HomeNest
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
