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

import "./Enquiry.css";

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

type EnquiryProperty = Property & {
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerType?: string;
  isUserListing?: boolean;
};

type SavedEnquiry = {
  id: number;

  propertyId: number;
  propertyTitle: string;
  location: string;
  propertyImage: string;

  ownerName: string;
  phone: string;

  message: string;
  date: string;

  status:
    | "pending"
    | "contacted"
    | "closed";

  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

function Enquiry() {
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

  const [email, setEmail] =
    useState(
      currentUser?.email ||
      ""
    );

  const [phone, setPhone] =
    useState(
      currentUser?.phoneNumber ||
      ""
    );

  const [message, setMessage] =
    useState(
      property
        ? `I am interested in ${property.title}. Please share more details about this property.`
        : ""
    );

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
      <div className="enquiry-page">
        <Navbar />

        <main className="enquiry-main">
          <section className="enquiry-not-found">
            <h1>
              Property Not Found
            </h1>

            <p>
              The property you are
              trying to enquire about
              is not available.
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
     SUBMIT ENQUIRY
  ========================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    const savedEnquiries =
      getSavedEnquiries();

    const newEnquiry: SavedEnquiry = {
      id: Date.now(),

      propertyId:
        property.id,

      propertyTitle:
        property.title,

      location:
        property.location,

      propertyImage:
        property.image,

      ownerName,

      phone:
        ownerPhone,

      message:
        message.trim(),

      date:
        new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),

      status:
        "pending",

      customerName:
        name.trim(),

      customerEmail:
        email.trim(),

      customerPhone:
        phone.trim(),
    };

    const updatedEnquiries:
      SavedEnquiry[] = [
      newEnquiry,
      ...savedEnquiries,
    ];

    setUserStorageItem(
      "homeNestEnquiries",
      updatedEnquiries
    );

    setSubmitted(true);
  };

  /* =========================================
     SUCCESS SCREEN
  ========================================= */

  if (submitted) {
    return (
      <div className="enquiry-page">
        <Navbar />

        <main className="enquiry-main">
          <section className="enquiry-success">
            <div className="enquiry-success-icon">
              ✓
            </div>

            <span className="enquiry-eyebrow">
              ENQUIRY SENT
            </span>

            <h1>
              Enquiry Submitted
              Successfully
            </h1>

            <p>
              Your enquiry for{" "}
              <strong>
                {property.title}
              </strong>{" "}
              has been submitted
              successfully.
            </p>

            <div className="enquiry-success-actions">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/my-enquiries"
                  )
                }
              >
                View My Enquiries
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
     ENQUIRY FORM
  ========================================= */

  return (
    <div className="enquiry-page">
      <Navbar />

      <main className="enquiry-main">
        <section className="enquiry-header">
          <span className="enquiry-eyebrow">
            PROPERTY ENQUIRY
          </span>

          <h1>
            Enquire About Property
          </h1>

          <p>
            Send your enquiry to the
            property owner or agent.
          </p>
        </section>

        <section className="enquiry-layout">
          <div className="enquiry-form-card">
            <div className="enquiry-form-heading">
              <h2>
                Your Details
              </h2>

              <p>
                Enter your contact
                information and
                enquiry message.
              </p>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="enquiry-form-grid">

                <div className="enquiry-field">
                  <label htmlFor="name">
                    Full Name *
                  </label>

                  <input
                    id="name"
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

                <div className="enquiry-field">
                  <label htmlFor="email">
                    Email Address *
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={
                      email
                    }
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Enter email"
                  />
                </div>

                <div className="enquiry-field">
                  <label htmlFor="phone">
                    Phone Number *
                  </label>

                  <input
                    id="phone"
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

                <div className="enquiry-field">
                  <label htmlFor="property">
                    Property
                  </label>

                  <input
                    id="property"
                    type="text"
                    value={
                      property.title
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="enquiry-field full">
                <label htmlFor="message">
                  Message *
                </label>

                <textarea
                  id="message"
                  rows={6}
                  value={
                    message
                  }
                  onChange={(
                    event
                  ) =>
                    setMessage(
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Write your enquiry"
                />
              </div>

              <div className="enquiry-form-actions">
                <button
                  type="button"
                  className="enquiry-cancel-button"
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
                  className="enquiry-submit-button"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>

          {/* =================================
              PROPERTY CARD
          ================================== */}

          <aside className="enquiry-property-card">
            <img
              src={
                property.image
              }
              alt={
                property.title
              }
            />

            <div className="enquiry-property-content">
              <span className="enquiry-property-badge">
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

              <div className="enquiry-property-info">
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
  EnquiryProperty |
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
  EnquiryProperty[] {
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
        ): property is EnquiryProperty =>
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
  EnquiryProperty |
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
   PROPERTY TYPE NORMALIZER
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
   GET SAVED ENQUIRIES
========================================= */

function getSavedEnquiries():
  SavedEnquiry[] {
  return getUserStorageItem<
    SavedEnquiry[]
  >(
    "homeNestEnquiries",
    []
  );
}

export default Enquiry;