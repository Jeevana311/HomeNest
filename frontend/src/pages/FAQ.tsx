import {
  useState,
} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./FAQ.css";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is HomeNest?",
    answer:
      "HomeNest is a real-estate marketplace for discovering, shortlisting, buying, renting and listing properties across Guntur, Vijayawada and Tenali.",
  },
  {
    question: "Can I browse properties without creating an account?",
    answer:
      "Yes. Visitors can browse properties, use filters and open property details without logging in. An account is required for actions such as saving favorites, listing a property, sending enquiries and scheduling visits.",
  },
  {
    question: "What types of properties can I find on HomeNest?",
    answer:
      "HomeNest supports residential properties, commercial spaces, plots and land, industrial properties, PG or hostel options, co-living spaces and guest houses.",
  },
  {
    question: "How do I save a property?",
    answer:
      "Login to your HomeNest account and select the favorite or save option on a property card or property details page. Your saved properties will appear in the Favorites page.",
  },
  {
    question: "How can I list my own property?",
    answer:
      "After logging in, select List Property from the navigation bar. Add the required property information, images, pricing and contact details, then publish the listing.",
  },
  {
    question: "Can I edit or deactivate my listing later?",
    answer:
      "Yes. Open My Listings from your account. You can view, edit, activate, deactivate or delete properties that belong to your account.",
  },
  {
    question: "How do property enquiries work?",
    answer:
      "On a property details page, choose Enquire Now, enter your message and submit it. Your submitted enquiries can be viewed later from My Enquiries.",
  },
  {
    question: "Can I schedule a property visit?",
    answer:
      "Yes. Select Schedule Visit from the property details page, choose an available date and time, enter the required details and submit your request.",
  },
  {
    question: "Does HomeNest process property payments?",
    answer:
      "No. HomeNest currently helps users discover properties and connect with owners or agents. Property payments, legal registration, loans and ownership verification are not processed through the platform.",
  },
  {
    question: "Should I verify property details before making a decision?",
    answer:
      "Yes. Users should independently verify property ownership, legal documents, pricing, availability, amenities and other important details directly with the owner, agent or relevant authorities.",
  },
];

function FAQ() {
  const [
    openIndex,
    setOpenIndex,
  ] =
    useState<number | null>(0);

  return (
    <div className="faq-page">
      <Navbar />

      <main>
        <section className="faq-hero">
          <span className="faq-label">
            HELP CENTER
          </span>

          <h1>
            Frequently Asked Questions
          </h1>

          <p>
            Find quick answers about
            browsing, favorites,
            listings, enquiries and
            scheduled visits.
          </p>
        </section>

        <section className="faq-content">
          <div className="faq-list">
            {faqItems.map(
              (
                item,
                index
              ) => {
                const isOpen =
                  openIndex ===
                  index;

                return (
                  <article
                    key={
                      item.question
                    }
                    className={
                      isOpen
                        ? "faq-item open"
                        : "faq-item"
                    }
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() =>
                        setOpenIndex(
                          isOpen
                            ? null
                            : index
                        )
                      }
                    >
                      <span>
                        {
                          item.question
                        }
                      </span>

                      <strong>
                        {isOpen
                          ? "−"
                          : "+"}
                      </strong>
                    </button>

                    {isOpen && (
                      <div className="faq-answer">
                        <p>
                          {
                            item.answer
                          }
                        </p>
                      </div>
                    )}
                  </article>
                );
              }
            )}
          </div>

          <aside className="faq-help-card">
            <span>
              STILL NEED HELP?
            </span>

            <h2>
              Contact HomeNest
            </h2>

            <p>
              If your question is not
              answered here, our contact
              page is available for
              support and general
              enquiries.
            </p>

            <a href="/contact">
              Contact Us
            </a>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;
