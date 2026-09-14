import {
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getCurrentUser,
  getUserStorageItem,
  setUserStorageItem,
} from "../utils/authStorage";

import {
  properties,
  type Property,
} from "../data/properties";

import "./ScheduleVisit.css";

type StoredListing = {
  id: number;
  ownerUserId?: number;
  title: string;
  location: string;
  price: string;
  type: string;
  purpose: "Sell" | "Rent";
  status: "active" | "inactive";
  enquiries: number;
  image: string;

  category?: string;
  area?: string;
  description?: string;

  ownerType?: string;
  ownerName?: string;
  phone?: string;
  email?: string;

  createdAt?: string;
};

type VisitProperty = Property & {
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerType?: string;
  isUserListing?: boolean;
};

type VisitStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled";

type SavedVisit = {
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

  visitorName: string;
  visitorPhone: string;

  notes: string;
};

function ScheduleVisit() {
  const navigate =
    useNavigate();

  const currentUser =
    getCurrentUser();

  const { id } =
    useParams();

  const property =
    getPropertyById(
      Number(id)
    );

  const [name, setName] =
    useState(
      currentUser?.fullName ||
      ""
    );

  const [phone, setPhone] =
    useState(
      currentUser?.phoneNumber ||
      ""
    );

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [
    submitted,
    setSubmitted,
  ] =
    useState(false);

  /* =========================================
     PROPERTY NOT FOUND
  ========================================= */

  if (!property) {
    return (
      <div className="schedule-visit-page">
        <Navbar />

        <main className="schedule-visit-main">
          <section className="schedule-visit-not-found">
            <h1>
              Property Not Found
            </h1>

            <p>
              The property you are
              trying to schedule a
              visit for is not
              available.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/properties"
                )
              }
            >
              Browse Properties
            </button>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  /* =========================================
     OWNER DETAILS
  ========================================= */

  const ownerName =
    property.ownerName ||
    "HomeNest Agent";

  const ownerPhone =
    property.ownerPhone ||
    "+91 98765 43210";

  /* =========================================
     SUBMIT VISIT
  ========================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !phone.trim() ||
      !date ||
      !time
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    if (
      isPastDate(
        date
      )
    ) {
      alert(
        "Please select today or a future date."
      );

      return;
    }

    const savedVisits =
      getSavedVisits();

    const newVisit:
      SavedVisit = {
      id: Date.now(),

      propertyId:
        property.id,

      propertyTitle:
        property.title,

      location:
        property.location,

      image:
        property.image,

      ownerName,

      phone:
        ownerPhone,

      date,

      time,

      status:
        "requested",

      visitorName:
        name.trim(),

      visitorPhone:
        phone.trim(),

      notes:
        notes.trim(),
    };

    const updatedVisits:
      SavedVisit[] = [
      newVisit,
      ...savedVisits,
    ];

    setUserStorageItem(
      "homeNestScheduledVisits",
      updatedVisits
    );

    setSubmitted(true);
  };

  /* =========================================
     SUCCESS SCREEN
  ========================================= */

  if (submitted) {
    return (
      <div className="schedule-visit-page">
        <Navbar />

        <main className="schedule-visit-main">
          <section className="schedule-success">
            <div className="schedule-success-icon">
              ✓
            </div>

            <span className="schedule-eyebrow">
              VISIT REQUESTED
            </span>

            <h1>
              Visit Requested
              Successfully
            </h1>

            <p>
              Your visit request for{" "}
              <strong>
                {
                  property.title
                }
              </strong>{" "}
              has been submitted.
            </p>

            <div className="schedule-selected-info">
              <div>
                <span>
                  Date
                </span>

                <strong>
                  {formatVisitDate(
                    date
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Time
                </span>

                <strong>
                  {time}
                </strong>
              </div>
            </div>

            <p className="schedule-success-note">
              Your request will remain
              in Requested status until
              the owner or agent
              confirms it.
            </p>

            <div className="schedule-success-actions">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/scheduled-visits"
                  )
                }
              >
                View Scheduled Visits
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() =>
                  navigate(
                    `/properties/${property.id}`
                  )
                }
              >
                Back to Property
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  /* =========================================
     SCHEDULE FORM
  ========================================= */

  return (
    <div className="schedule-visit-page">
      <Navbar />

      <main className="schedule-visit-main">
        <section className="schedule-visit-header">
          <span className="schedule-eyebrow">
            PROPERTY VISIT
          </span>

          <h1>
            Schedule a Visit
          </h1>

          <p>
            Choose your preferred date
            and time to visit this
            property.
          </p>
        </section>

        <section className="schedule-layout">
          <div className="schedule-form-card">
            <div className="schedule-form-heading">
              <h2>
                Visit Details
              </h2>

              <p>
                Enter your contact
                information and
                preferred visit
                schedule.
              </p>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="schedule-form-grid">

                <div className="schedule-field">
                  <label htmlFor="visitName">
                    Full Name *
                  </label>

                  <input
                    id="visitName"
                    type="text"
                    value={
                      name
                    }
                    onChange={(
                      event
                    ) =>
                      setName(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Enter full name"
                  />
                </div>

                <div className="schedule-field">
                  <label htmlFor="visitPhone">
                    Phone Number *
                  </label>

                  <input
                    id="visitPhone"
                    type="tel"
                    value={
                      phone
                    }
                    onChange={(
                      event
                    ) =>
                      setPhone(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="schedule-field">
                  <label htmlFor="visitDate">
                    Preferred Date *
                  </label>

                  <input
                    id="visitDate"
                    type="date"
                    min={
                      getTodayDate()
                    }
                    value={
                      date
                    }
                    onChange={(
                      event
                    ) =>
                      setDate(
                        event
                          .target
                          .value
                      )
                    }
                  />
                </div>

                <div className="schedule-field">
                  <label htmlFor="visitTime">
                    Preferred Time *
                  </label>

                  <select
                    id="visitTime"
                    value={
                      time
                    }
                    onChange={(
                      event
                    ) =>
                      setTime(
                        event
                          .target
                          .value
                      )
                    }
                  >
                    <option value="">
                      Select time
                    </option>

                    <option value="09:00 AM">
                      09:00 AM
                    </option>

                    <option value="10:30 AM">
                      10:30 AM
                    </option>

                    <option value="12:00 PM">
                      12:00 PM
                    </option>

                    <option value="02:00 PM">
                      02:00 PM
                    </option>

                    <option value="03:30 PM">
                      03:30 PM
                    </option>

                    <option value="05:00 PM">
                      05:00 PM
                    </option>
                  </select>
                </div>
              </div>

              <div className="schedule-field full">
                <label htmlFor="visitNotes">
                  Additional Notes
                </label>

                <textarea
                  id="visitNotes"
                  rows={5}
                  value={
                    notes
                  }
                  onChange={(
                    event
                  ) =>
                    setNotes(
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Any message for the owner or agent"
                />
              </div>

              <div className="schedule-form-actions">
                <button
                  type="button"
                  className="schedule-cancel-button"
                  onClick={() =>
                    navigate(
                      `/properties/${property.id}`
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="schedule-submit-button"
                >
                  Request Visit
                </button>
              </div>
            </form>
          </div>

          {/* =================================
              PROPERTY CARD
          ================================== */}

          <aside className="schedule-property-card">
            <img
              src={
                property.image
              }
              alt={
                property.title
              }
            />

            <div className="schedule-property-content">
              <span className="schedule-property-badge">
                {
                  property.badge
                }
              </span>

              <h2>
                {
                  property.title
                }
              </h2>

              <p>
                ⌖{" "}
                {
                  property.location
                }
                , Andhra Pradesh
              </p>

              <strong>
                {
                  property.priceLabel
                }
              </strong>

              <div className="schedule-property-info">
                {property.details.map(
                  (
                    detail,
                    index
                  ) => (
                    <span
                      key={`${detail}-${index}`}
                    >
                      {detail}
                    </span>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/properties/${property.id}`
                  )
                }
              >
                View Property Details
              </button>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================
   FIND PROPERTY
========================================= */

function getPropertyById(
  id: number
):
  VisitProperty |
  undefined {
  const normalProperty =
    properties.find(
      (property) =>
        property.id === id
    );

  if (normalProperty) {
    return normalProperty;
  }

  const ownerProperties =
    getOwnerProperties();

  return ownerProperties.find(
    (property) =>
      property.id === id
  );
}

/* =========================================
   GET OWNER PROPERTIES
========================================= */

function getOwnerProperties():
  VisitProperty[] {
  const stored =
    localStorage.getItem(
      "homeNestListings"
    );

  if (!stored) {
    return [];
  }

  try {
    const listings =
      JSON.parse(
        stored
      ) as StoredListing[];

    return listings
      .filter(
        (listing) =>
          listing.status ===
          "active"
      )
      .map(
        convertListingToProperty
      )
      .filter(
        (
          property
        ): property is VisitProperty =>
          property !== null
      );
  } catch {
    return [];
  }
}

/* =========================================
   CONVERT OWNER LISTING
========================================= */

function convertListingToProperty(
  listing: StoredListing
):
  VisitProperty |
  null {
  const category =
    normalizeCategory(
      listing.category
    );

  if (!category) {
    return null;
  }

  const mode:
    Property["mode"] =
    listing.purpose ===
    "Sell"
      ? "buy"
      : "rent";

  const area =
    Number(
      listing.area
    ) || 0;

  const details:
    string[] = [];

  if (area > 0) {
    details.push(
      `${area} sq.ft`
    );
  }

  if (
    listing.type
  ) {
    details.push(
      listing.type
    );
  }

  if (
    listing.ownerType
  ) {
    details.push(
      `Listed by ${listing.ownerType}`
    );
  }

  if (
    details.length === 0
  ) {
    details.push(
      "Property details available"
    );
  }

  return {
    id:
      listing.id,

    title:
      listing.title,

    location:
      listing.location,

    mode,

    category,

    type:
      normalizePropertyType(
        listing.type
      ),

    price:
      extractPriceNumber(
        listing.price
      ),

    priceLabel:
      listing.price,

    area,

    details,

    badge:
      mode === "buy"
        ? "Owner Listing"
        : "For Rent",

    image:
      listing.image,

    postedDate:
      listing.createdAt ||
      new Date().toISOString(),

    ownerName:
      listing.ownerName,

    ownerPhone:
      listing.phone,

    ownerEmail:
      listing.email,

    ownerType:
      listing.ownerType,

    isUserListing:
      true,
  };
}

/* =========================================
   CATEGORY NORMALIZER
========================================= */

function normalizeCategory(
  category?: string
):
  Property["category"] |
  null {
  switch (category) {
    case "residential":
      return "residential";

    case "commercial":
      return "commercial";

    case "land":
      return "land";

    case "industrial":
      return "industrial";

    case "rental":
      return "rental";

    default:
      return null;
  }
}

/* =========================================
   PROPERTY TYPE
========================================= */

function normalizePropertyType(
  value: string
) {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

/* =========================================
   PRICE NUMBER
========================================= */

function extractPriceNumber(
  value: string
) {
  const numericValue =
    value.replace(
      /[^0-9.]/g,
      ""
    );

  const number =
    Number(
      numericValue
    );

  return Number.isNaN(
    number
  )
    ? 0
    : number;
}

/* =========================================
   GET SAVED VISITS
========================================= */

function getSavedVisits():
  SavedVisit[] {
  return getUserStorageItem<
    SavedVisit[]
  >(
    "homeNestScheduledVisits",
    []
  );
}

/* =========================================
   TODAY
========================================= */

function getTodayDate() {
  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${year}-${month}-${day}`;
}

/* =========================================
   CHECK PAST DATE
========================================= */

function isPastDate(
  date: string
) {
  return (
    date <
    getTodayDate()
  );
}

/* =========================================
   FORMAT DATE
========================================= */

function formatVisitDate(
  date: string
) {
  if (!date) {
    return "";
  }

  const [
    year,
    month,
    day,
  ] =
    date
      .split("-")
      .map(Number);

  const parsedDate =
    new Date(
      year,
      month - 1,
      day
    );

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default ScheduleVisit;