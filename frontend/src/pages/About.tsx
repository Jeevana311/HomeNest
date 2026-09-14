import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Navbar />

      <main>
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-eyebrow">
              ABOUT HOMENEST
            </span>

            <h1>
              Making Property Discovery Simpler
            </h1>

            <p>
              HomeNest helps people discover, compare, shortlist,
              buy, rent and list properties across Guntur,
              Vijayawada and Tenali.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-intro-grid">
            <div>
              <span className="about-eyebrow teal">
                WHO WE ARE
              </span>

              <h2>
                A simple real-estate platform for property seekers
                and owners
              </h2>

              <p>
                HomeNest is designed to connect property seekers,
                owners, agents and developers through one simple
                digital platform.
              </p>

              <p>
                Users can explore residential, commercial, land,
                industrial and rental properties, save favorites,
                send enquiries and schedule property visits.
              </p>
            </div>

            <div className="about-highlight-card">
              <span>⌂</span>

              <h3>
                Find the right property faster
              </h3>

              <p>
                Search by location, category, property type,
                price and purpose to narrow down suitable
                properties quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="about-values-section">
          <div className="about-section">
            <div className="about-center-heading">
              <span className="about-eyebrow teal">
                OUR APPROACH
              </span>

              <h2>
                What HomeNest Focuses On
              </h2>

              <p>
                A clean and practical property experience for
                users across different real-estate needs.
              </p>
            </div>

            <div className="about-values-grid">
              <article>
                <span>⌕</span>

                <h3>
                  Easy Discovery
                </h3>

                <p>
                  Search and filter properties using location,
                  property type, category, price and buy or rent
                  requirements.
                </p>
              </article>

              <article>
                <span>♡</span>

                <h3>
                  Shortlisting
                </h3>

                <p>
                  Save suitable properties to Favorites and
                  revisit them later before making a decision.
                </p>
              </article>

              <article>
                <span>⌂</span>

                <h3>
                  Property Listing
                </h3>

                <p>
                  Owners and agents can add property details,
                  images, contact information and listing
                  information.
                </p>
              </article>

              <article>
                <span>✓</span>

                <h3>
                  Direct Enquiries
                </h3>

                <p>
                  Interested users can connect with property
                  owners, agents or project representatives.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-mission-grid">
            <article className="about-mission-card">
              <span className="about-eyebrow teal">
                OUR MISSION
              </span>

              <h2>
                Simplify the real-estate journey
              </h2>

              <p>
                Our goal is to make discovering and listing
                properties simple, organized and easy to
                understand for every user.
              </p>
            </article>

            <article className="about-mission-card">
              <span className="about-eyebrow teal">
                OUR VISION
              </span>

              <h2>
                Build a trusted property discovery platform
              </h2>

              <p>
                HomeNest aims to become a practical marketplace
                where users can explore different property
                options and connect with the right people.
              </p>
            </article>
          </div>
        </section>

        <section className="about-locations-section">
          <div className="about-section">
            <div className="about-center-heading">
              <span className="about-eyebrow">
                LOCATIONS
              </span>

              <h2>
                Currently Focused On
              </h2>

              <p>
                HomeNest currently focuses on three major
                property markets.
              </p>
            </div>

            <div className="about-location-grid">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/properties?location=Guntur"
                  )
                }
              >
                <span>⌖</span>

                <strong>
                  Guntur
                </strong>

                <small>
                  Explore Properties
                </small>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/properties?location=Vijayawada"
                  )
                }
              >
                <span>⌖</span>

                <strong>
                  Vijayawada
                </strong>

                <small>
                  Explore Properties
                </small>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/properties?location=Tenali"
                  )
                }
              >
                <span>⌖</span>

                <strong>
                  Tenali
                </strong>

                <small>
                  Explore Properties
                </small>
              </button>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div>
            <span className="about-eyebrow">
              START EXPLORING
            </span>

            <h2>
              Find your next property with HomeNest
            </h2>

            <p>
              Browse properties or list your own property and
              connect with interested buyers and tenants.
            </p>

            <div className="about-cta-buttons">
              <button
                type="button"
                onClick={() =>
                  navigate("/properties")
                }
              >
                Browse Properties
              </button>

              <button
                type="button"
                className="about-secondary-button"
                onClick={() =>
                  navigate(
                    "/list-property"
                  )
                }
              >
                List Property
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;