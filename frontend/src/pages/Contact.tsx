import { useState, type ChangeEvent, type FormEvent } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Contact.css";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] =
    useState<ContactForm>(initialForm);

  const [submitted, setSubmitted] =
    useState(false);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject ||
      !formData.message.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <section className="contact-hero">
          <div className="contact-hero-content">
            <span className="contact-eyebrow">
              CONTACT HOMENEST
            </span>

            <h1>How Can We Help You?</h1>

            <p>
              Have questions about a property, listing, enquiry or visit?
              Send us a message and our team can assist you.
            </p>
          </div>
        </section>

        <section className="contact-content">
          <div className="contact-heading">
            <span className="contact-eyebrow teal">
              GET IN TOUCH
            </span>

            <h2>Contact Our Team</h2>

            <p>
              Choose the most convenient way to reach HomeNest.
            </p>
          </div>

          <div className="contact-info-grid">
            <article className="contact-info-card">
              <span>✉</span>

              <h3>Email</h3>

              <p>
                For property, account and general platform enquiries.
              </p>

              <strong>
                support@homenest.com
              </strong>
            </article>

            <article className="contact-info-card">
              <span>☎</span>

              <h3>Phone</h3>

              <p>
                Speak with our support team during business hours.
              </p>

              <strong>
                +91 98765 43210
              </strong>
            </article>

            <article className="contact-info-card">
              <span>⌖</span>

              <h3>Service Locations</h3>

              <p>
                HomeNest currently focuses on property discovery across:
              </p>

              <strong>
                Guntur · Vijayawada · Tenali
              </strong>
            </article>
          </div>

          <div className="contact-main-grid">
            <section className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    ✓
                  </div>

                  <span className="contact-eyebrow teal">
                    MESSAGE SENT
                  </span>

                  <h2>
                    Thank you for contacting HomeNest
                  </h2>

                  <p>
                    Your message has been received. Once backend
                    integration is added, this form can send enquiries
                    directly to the support team.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <span className="contact-eyebrow teal">
                    SEND A MESSAGE
                  </span>

                  <h2>Tell Us What You Need</h2>

                  <p className="contact-form-description">
                    Complete the form below and provide as much information
                    as possible.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="contact-two-columns">
                      <div className="contact-field">
                        <label htmlFor="name">
                          Full Name *
                        </label>

                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="contact-field">
                        <label htmlFor="email">
                          Email Address *
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div className="contact-two-columns">
                      <div className="contact-field">
                        <label htmlFor="phone">
                          Phone Number
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="contact-field">
                        <label htmlFor="subject">
                          Subject *
                        </label>

                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="">
                            Select subject
                          </option>

                          <option value="Property Enquiry">
                            Property Enquiry
                          </option>

                          <option value="Listing Support">
                            Listing Support
                          </option>

                          <option value="Visit Scheduling">
                            Visit Scheduling
                          </option>

                          <option value="Account Support">
                            Account Support
                          </option>

                          <option value="New Projects">
                            New Projects
                          </option>

                          <option value="General Enquiry">
                            General Enquiry
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="message">
                        Message *
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="contact-submit-button"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </section>

            <aside className="contact-side-card">
              <span className="contact-eyebrow teal">
                NEED PROPERTY HELP?
              </span>

              <h2>HomeNest Support</h2>

              <p>
                You can contact us for help with property discovery,
                listings, enquiries and scheduled visits.
              </p>

              <div className="contact-support-item">
                <span>01</span>

                <div>
                  <strong>
                    Property Search
                  </strong>

                  <p>
                    Help finding suitable residential, commercial,
                    land, industrial or rental properties.
                  </p>
                </div>
              </div>

              <div className="contact-support-item">
                <span>02</span>

                <div>
                  <strong>
                    Property Listing
                  </strong>

                  <p>
                    Help owners and agents understand how to list and
                    manage a property.
                  </p>
                </div>
              </div>

              <div className="contact-support-item">
                <span>03</span>

                <div>
                  <strong>
                    Enquiries & Visits
                  </strong>

                  <p>
                    Assistance with contacting owners, agents and project
                    representatives.
                  </p>
                </div>
              </div>

              <div className="contact-note-box">
                <strong>
                  Important
                </strong>

                <p>
                  HomeNest is a property discovery and connection platform.
                  It does not process legal registration, home loans or
                  property payments.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-location-section">
          <div className="contact-location-content">
            <div>
              <span className="contact-eyebrow">
                OUR COVERAGE
              </span>

              <h2>
                Serving Three Key Property Markets
              </h2>

              <p>
                Explore properties and new developments across Guntur,
                Vijayawada and Tenali.
              </p>
            </div>

            <div className="contact-location-cities">
              <span>Guntur</span>
              <span>Vijayawada</span>
              <span>Tenali</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;