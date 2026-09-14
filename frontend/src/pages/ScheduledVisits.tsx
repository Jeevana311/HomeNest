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

import "./ScheduledVisits.css";

type VisitStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled";

type Visit = {
  id: number;

  propertyId: number;

  propertyTitle: string;
  location: string;

  image: string;

  ownerName: string;
  phone: string;

  date: string;
  time: string;

  status: VisitStatus;

  visitorName?: string;
  visitorPhone?: string;

  notes?: string;
};

function ScheduledVisits() {
  const navigate =
    useNavigate();

  const [
    visits,
    setVisits,
  ] =
    useState<Visit[]>([]);

  const [
    filter,
    setFilter,
  ] =
    useState<
      "all" | VisitStatus
    >("all");

  useEffect(() => {
    const savedVisits =
      getUserStorageItem<Visit[]>(
        "homeNestScheduledVisits",
        []
      );

    setVisits(
      savedVisits
    );
  }, []);

  const filteredVisits =
    filter === "all"
      ? visits
      : visits.filter(
          (visit) =>
            visit.status === filter
        );

  const requestedCount =
    visits.filter(
      (visit) =>
        visit.status ===
        "requested"
    ).length;

  const confirmedCount =
    visits.filter(
      (visit) =>
        visit.status ===
        "confirmed"
    ).length;

  const completedCount =
    visits.filter(
      (visit) =>
        visit.status ===
        "completed"
    ).length;

  const cancelVisit = (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this property visit?"
      );

    if (!confirmed) {
      return;
    }

    const updatedVisits: Visit[] =
      visits.map(
        (visit) =>
          visit.id === id
            ? {
                ...visit,
                status:
                  "cancelled",
              }
            : visit
      );

    setVisits(
      updatedVisits
    );

    setUserStorageItem(
      "homeNestScheduledVisits",
      updatedVisits
    );
  };

  const removeVisit = (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Remove this visit from your history?"
      );

    if (!confirmed) {
      return;
    }

    const updatedVisits =
      visits.filter(
        (visit) =>
          visit.id !== id
      );

    setVisits(
      updatedVisits
    );

    setUserStorageItem(
      "homeNestScheduledVisits",
      updatedVisits
    );
  };

  return (
    <div className="scheduled-visits-page">
      <Navbar />

      <main className="scheduled-visits-main">
        <section className="scheduled-visits-header">
          <div>
            <span className="scheduled-visits-eyebrow">
              PROPERTY VISITS
            </span>

            <h1>
              Scheduled Visits
            </h1>

            <p>
              Track upcoming property
              visits and review your
              completed or cancelled
              appointments.
            </p>
          </div>

          <button
            type="button"
            className="schedule-new-visit-button"
            onClick={() =>
              navigate(
                "/properties"
              )
            }
          >
            Find Properties
          </button>
        </section>

        <section className="visit-stats">
          <article>
            <span>
              Total Visits
            </span>

            <strong>
              {visits.length}
            </strong>
          </article>

          <article>
            <span>
              Requested
            </span>

            <strong>
              {requestedCount}
            </strong>
          </article>

          <article>
            <span>
              Confirmed
            </span>

            <strong>
              {confirmedCount}
            </strong>
          </article>

          <article>
            <span>
              Completed
            </span>

            <strong>
              {completedCount}
            </strong>
          </article>
        </section>

        <section className="scheduled-visits-content">
          <div className="visits-toolbar">
            <div>
              <h2>
                Your Property Visits
              </h2>

              <p>
                {
                  filteredVisits.length
                }{" "}
                {
                  filteredVisits.length ===
                  1
                    ? "visit"
                    : "visits"
                }
              </p>
            </div>

            <div className="visit-filter-buttons">
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
                  filter === "requested"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "requested"
                  )
                }
              >
                Requested
              </button>

              <button
                type="button"
                className={
                  filter === "confirmed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "confirmed"
                  )
                }
              >
                Confirmed
              </button>

              <button
                type="button"
                className={
                  filter === "completed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "completed"
                  )
                }
              >
                Completed
              </button>

              <button
                type="button"
                className={
                  filter === "cancelled"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "cancelled"
                  )
                }
              >
                Cancelled
              </button>
            </div>
          </div>

          {filteredVisits.length > 0 ? (
            <div className="visits-list">
              {filteredVisits.map(
                (visit) => (
                  <article
                    key={visit.id}
                    className="visit-card"
                  >
                    <div className="visit-image">
                      <img
                        src={visit.image}
                        alt={
                          visit.propertyTitle
                        }
                      />

                      <span
                        className={`visit-status ${visit.status}`}
                      >
                        {visit.status}
                      </span>
                    </div>

                    <div className="visit-details">
                      <div className="visit-title-row">
                        <div>
                          <h3>
                            {
                              visit.propertyTitle
                            }
                          </h3>

                          <p>
                            ⌖{" "}
                            {
                              visit.location
                            }
                            , Andhra Pradesh
                          </p>
                        </div>

                        <button
                          type="button"
                          className="visit-view-property"
                          onClick={() =>
                            navigate(
                              `/properties/${visit.propertyId}`
                            )
                          }
                        >
                          View Property
                        </button>
                      </div>

                      <div className="visit-date-box">
                        <div>
                          <span>
                            Date
                          </span>

                          <strong>
                            {formatDate(
                              visit.date
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Time
                          </span>

                          <strong>
                            {visit.time}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Status
                          </span>

                          <strong>
                            {formatStatus(
                              visit.status
                            )}
                          </strong>
                        </div>
                      </div>

                      <div className="visit-owner">
                        <div>
                          <span>
                            Owner / Agent
                          </span>

                          <strong>
                            {
                              visit.ownerName
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Contact
                          </span>

                          <strong>
                            {visit.phone}
                          </strong>
                        </div>
                      </div>

                      <div className="visit-actions">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/properties/${visit.propertyId}`
                            )
                          }
                        >
                          Property Details
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            window.alert(
                              `Contact ${visit.ownerName} at ${visit.phone}`
                            )
                          }
                        >
                          Contact Owner
                        </button>

                        {(visit.status ===
                          "requested" ||
                          visit.status ===
                            "confirmed") && (
                          <button
                            type="button"
                            className="cancel-visit-button"
                            onClick={() =>
                              cancelVisit(
                                visit.id
                              )
                            }
                          >
                            Cancel Visit
                          </button>
                        )}

                        {(visit.status ===
                          "completed" ||
                          visit.status ===
                            "cancelled") && (
                          <button
                            type="button"
                            className="remove-visit-button"
                            onClick={() =>
                              removeVisit(
                                visit.id
                              )
                            }
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="no-visits">
              <span>
                ◷
              </span>

              <h2>
                No Visits Found
              </h2>

              <p>
                You don't have any
                property visits matching
                this filter.
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

function formatStatus(
  status: VisitStatus
) {
  return (
    status
      .charAt(0)
      .toUpperCase() +
    status.slice(1)
  );
}

function formatDate(
  date: string
) {
  if (!date) {
    return "";
  }

  const parsedDate =
    new Date(
      `${date}T00:00:00`
    );

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default ScheduledVisits;