import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Terms.css";

function Terms() {
  return (
    <div className="terms-page">
      <Navbar />

      <main>
        <section className="terms-hero">
          <span>
            LEGAL
          </span>

          <h1>
            Terms & Conditions
          </h1>

          <p>
            These terms describe the
            basic rules for using the
            HomeNest frontend
            marketplace.
          </p>
        </section>

        <section className="terms-container">
          <p className="terms-updated">
            Last updated:
            September 2026
          </p>

          <section>
            <h2>
              1. About HomeNest
            </h2>

            <p>
              HomeNest is a real-estate
              marketplace designed to
              help users discover,
              shortlist, buy, rent and
              list properties. The
              current platform focuses
              on Guntur, Vijayawada and
              Tenali.
            </p>
          </section>

          <section>
            <h2>
              2. User Accounts
            </h2>

            <p>
              Some features require a
              registered account.
              Users are responsible for
              providing accurate account
              information and for
              protecting their login
              credentials.
            </p>
          </section>

          <section>
            <h2>
              3. Property Listings
            </h2>

            <p>
              Owners and agents may
              create property listings.
              The person creating a
              listing is responsible for
              ensuring that its title,
              pricing, images, property
              details and contact
              information are accurate.
            </p>
          </section>

          <section>
            <h2>
              4. Property Verification
            </h2>

            <p>
              HomeNest does not
              independently guarantee
              ownership, legal title,
              availability, condition,
              pricing or authenticity of
              a property listing. Users
              should verify all important
              information before making
              any commitment.
            </p>
          </section>

          <section>
            <h2>
              5. Enquiries and Visits
            </h2>

            <p>
              HomeNest allows registered
              users to send enquiries and
              request property visits.
              These features help users
              connect with property
              owners or agents and do not
              create a legal agreement to
              buy, sell or rent a
              property.
            </p>
          </section>

          <section>
            <h2>
              6. Payments and Legal Transactions
            </h2>

            <p>
              HomeNest currently does not
              process property payments,
              registration, loan
              applications, deposits or
              legal ownership transfers.
              Any such transaction takes
              place outside the
              platform.
            </p>
          </section>

          <section>
            <h2>
              7. Acceptable Use
            </h2>

            <p>
              Users must not knowingly
              provide false information,
              impersonate another person,
              misuse another user&apos;s
              account, publish unlawful
              content or attempt to
              interfere with the
              operation of the
              platform.
            </p>
          </section>

          <section>
            <h2>
              8. Changes to the Platform
            </h2>

            <p>
              HomeNest may update
              features, routes, listing
              requirements and these
              terms as the project
              evolves. The latest version
              displayed on the website
              will apply.
            </p>
          </section>

          <section>
            <h2>
              9. Contact
            </h2>

            <p>
              Questions regarding these
              terms can be submitted
              through the HomeNest
              Contact Us page.
            </p>
          </section>

          <div className="terms-note">
            <strong>
              Prototype notice:
            </strong>{" "}
            HomeNest is currently being
            developed as a frontend
            project. Production legal
            terms should be reviewed and
            adapted before a commercial
            launch.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Terms;
