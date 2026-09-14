import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Privacy.css";

function Privacy() {
  return (
    <div className="privacy-page">
      <Navbar />

      <main>
        <section className="privacy-hero">
          <span>
            PRIVACY
          </span>

          <h1>
            Privacy Policy
          </h1>

          <p>
            Learn what information the
            HomeNest prototype stores
            and how it is used within
            the application.
          </p>
        </section>

        <section className="privacy-container">
          <p className="privacy-updated">
            Last updated:
            September 2026
          </p>

          <section>
            <h2>
              1. Information You Provide
            </h2>

            <p>
              HomeNest may store account
              information such as your
              name, email address and
              phone number. Property
              owners or agents may also
              provide property details,
              images and contact
              information when creating
              a listing.
            </p>
          </section>

          <section>
            <h2>
              2. Saved Activity
            </h2>

            <p>
              Registered users may save
              favorites, submit property
              enquiries, schedule visits
              and create property
              listings. These records are
              used to provide the
              related account features.
            </p>
          </section>

          <section>
            <h2>
              3. Current Prototype Storage
            </h2>

            <p>
              The current frontend
              prototype uses browser
              localStorage and
              sessionStorage to simulate
              accounts, sessions,
              listings, favorites and
              other application data.
              This approach is intended
              for development and
              demonstration only.
            </p>
          </section>

          <section>
            <h2>
              4. Authentication Data
            </h2>

            <p>
              The prototype currently
              stores demo account data
              in browser storage.
              Production versions should
              replace this with secure
              backend authentication,
              password hashing and
              token-based session
              management.
            </p>
          </section>

          <section>
            <h2>
              5. Property Contact Information
            </h2>

            <p>
              Contact information entered
              by property owners or
              agents may be displayed on
              property-related pages so
              interested users can make
              enquiries or request
              visits.
            </p>
          </section>

          <section>
            <h2>
              6. Third-Party Services
            </h2>

            <p>
              Some interface elements
              such as social login, maps
              or external services may
              be connected later. Any
              future integration should
              follow the privacy
              requirements of the
              relevant third-party
              provider.
            </p>
          </section>

          <section>
            <h2>
              7. Data Security
            </h2>

            <p>
              Browser storage used by the
              current prototype should
              not be treated as secure
              storage for sensitive
              production data. The
              planned backend should use
              appropriate authentication,
              authorization and database
              security practices.
            </p>
          </section>

          <section>
            <h2>
              8. Future Backend Integration
            </h2>

            <p>
              When HomeNest is connected
              to Spring Boot and
              PostgreSQL, this policy
              should be updated to
              explain server-side data
              storage, retention,
              deletion, security and
              account-management
              practices.
            </p>
          </section>

          <section>
            <h2>
              9. Contact
            </h2>

            <p>
              Privacy-related questions
              can be submitted through
              the Contact Us page.
            </p>
          </section>

          <div className="privacy-note">
            <strong>
              Development notice:
            </strong>{" "}
            This privacy page describes
            the behavior of the current
            HomeNest frontend prototype
            and should be reviewed before
            production deployment.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;
