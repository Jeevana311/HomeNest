import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getUserStorageItem,
  setUserStorageItem,
} from "../utils/authStorage";

import "./MyEnquiries.css";

type EnquiryStatus =
  | "pending"
  | "contacted"
  | "closed";

type Enquiry = {
  id: number;

  propertyId: number;

  propertyTitle: string;
  location: string;
  propertyImage: string;

  ownerName: string;
  phone: string;

  message: string;
  date: string;

  status: EnquiryStatus;

  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
};

function MyEnquiries() {
  const navigate =
    useNavigate();

  const [
    enquiries,
    setEnquiries,
  ] =
    useState<Enquiry[]>([]);

  const [
    filter,
    setFilter,
  ] =
    useState<
      "all" | EnquiryStatus
    >("all");

  useEffect(() => {
    const savedEnquiries =
      getUserStorageItem<Enquiry[]>(
        "homeNestEnquiries",
        []
      );

    setEnquiries(
      savedEnquiries
    );
  }, []);

  const filteredEnquiries =
    filter === "all"
      ? enquiries
      : enquiries.filter(
          (enquiry) =>
            enquiry.status === filter
        );

  const pendingCount =
    enquiries.filter(
      (enquiry) =>
        enquiry.status ===
        "pending"
    ).length;

  const contactedCount =
    enquiries.filter(
      (enquiry) =>
        enquiry.status ===
        "contacted"
    ).length;

  const closedCount =
    enquiries.filter(
      (enquiry) =>
        enquiry.status ===
        "closed"
    ).length;

  const deleteEnquiry = (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this enquiry?"
      );

    if (!confirmed) {
      return;
    }

    const updatedEnquiries =
      enquiries.filter(
        (enquiry) =>
          enquiry.id !== id
      );

    setEnquiries(
      updatedEnquiries
    );

    setUserStorageItem(
      "homeNestEnquiries",
      updatedEnquiries
    );
  };

  return (
    <div className="my-enquiries-page">
      <Navbar />

      <main className="my-enquiries-main">
        <section className="my-enquiries-header">
          <div>
            <span className="my-enquiries-eyebrow">
              MY ACTIVITY
            </span>

            <h1>
              My Enquiries
            </h1>

            <p>
              Track the property
              enquiries you have sent
              through HomeNest.
            </p>
          </div>

          <button
            type="button"
            className="browse-properties-button"
            onClick={() =>
              navigate(
                "/properties"
              )
            }
          >
            Browse Properties
          </button>
        </section>

        <section className="enquiry-stats">
          <article>
            <span>
              Total Enquiries
            </span>

            <strong>
              {enquiries.length}
            </strong>
          </article>

          <article>
            <span>
              Pending
            </span>

            <strong>
              {pendingCount}
            </strong>
          </article>

          <article>
            <span>
              Contacted
            </span>

            <strong>
              {contactedCount}
            </strong>
          </article>

          <article>
            <span>
              Closed
            </span>

            <strong>
              {closedCount}
            </strong>
          </article>
        </section>

        <section className="my-enquiries-content">
          <div className="enquiries-toolbar">
            <div>
              <h2>
                Your Enquiries
              </h2>

              <p>
                {
                  filteredEnquiries.length
                }{" "}
                {
                  filteredEnquiries.length ===
                  1
                    ? "enquiry"
                    : "enquiries"
                }
              </p>
            </div>

            <div className="enquiry-filter-buttons">
              <button
                type="button"
                className={
                  filter === "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                All
              </button>

              <button
                type="button"
                className={
                  filter === "pending"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "pending"
                  )
                }
              >
                Pending
              </button>

              <button
                type="button"
                className={
                  filter === "contacted"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "contacted"
                  )
                }
              >
                Contacted
              </button>

              <button
                type="button"
                className={
                  filter === "closed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "closed"
                  )
                }
              >
                Closed
              </button>
            </div>
          </div>

          {filteredEnquiries.length > 0 ? (
            <div className="enquiry-list">
              {filteredEnquiries.map(
                (enquiry) => (
                  <article
                    key={enquiry.id}
                    className="enquiry-card"
                  >
                    <div className="enquiry-property-image">
                      <img
                        src={
                          enquiry.propertyImage
                        }
                        alt={
                          enquiry.propertyTitle
                        }
                      />

                      <span
                        className={`enquiry-status ${enquiry.status}`}
                      >
                        {enquiry.status}
                      </span>
                    </div>

                    <div className="enquiry-details">
                      <div className="enquiry-top-row">
                        <div>
                          <span className="enquiry-date">
                            Sent on{" "}
                            {enquiry.date}
                          </span>

                          <h3>
                            {
                              enquiry.propertyTitle
                            }
                          </h3>

                          <p className="enquiry-location">
                            ⌖{" "}
                            {
                              enquiry.location
                            }
                            , Andhra Pradesh
                          </p>
                        </div>

                        <button
                          type="button"
                          className="view-enquiry-property"
                          onClick={() =>
                            navigate(
                              `/properties/${enquiry.propertyId}`
                            )
                          }
                        >
                          View Property
                        </button>
                      </div>

                      <div className="enquiry-owner-info">
                        <div>
                          <span>
                            Owner / Agent
                          </span>

                          <strong>
                            {
                              enquiry.ownerName
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Phone
                          </span>

                          <strong>
                            {enquiry.phone}
                          </strong>
                        </div>
                      </div>

                      <div className="enquiry-message">
                        <span>
                          Your Message
                        </span>

                        <p>
                          {enquiry.message}
                        </p>
                      </div>

                      <div className="enquiry-actions">
                        <button
                          type="button"
                          onClick={() =>
                            window.alert(
                              `Contact ${enquiry.ownerName} at ${enquiry.phone}`
                            )
                          }
                        >
                          Contact Owner
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/properties/${enquiry.propertyId}`
                            )
                          }
                        >
                          Property Details
                        </button>

                        <button
                          type="button"
                          className="remove-enquiry-button"
                          onClick={() =>
                            deleteEnquiry(
                              enquiry.id
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="no-enquiries">
              <span>
                ✉
              </span>

              <h2>
                No Enquiries Found
              </h2>

              <p>
                You do not have any
                enquiries matching this
                filter.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/properties"
                  )
                }
              >
                Explore Properties
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MyEnquiries;