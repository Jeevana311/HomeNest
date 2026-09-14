import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getCurrentUser,
} from "../utils/authStorage";

import "./ListProperty.css";

type Purpose = "sell" | "rent";

type Category =
  | "residential"
  | "commercial"
  | "land"
  | "industrial"
  | "rental";

type FormData = {
  purpose: Purpose | "";
  category: Category | "";
  propertyType: string;

  title: string;
  location: string;
  price: string;
  area: string;

  bedrooms: string;
  bathrooms: string;
  furnishing: string;

  floor: string;
  parking: string;

  facing: string;
  roadWidth: string;

  power: string;
  loadingFacility: string;
  truckAccess: string;

  accommodation: string;
  facilities: string;

  description: string;

  ownerType: string;
  ownerName: string;
  phone: string;
  email: string;
};

type StoredListing = {
  id: number;
  ownerUserId: number;

  title: string;
  location: string;

  price: string;
  rawPrice: string;

  type: string;

  purpose: "Sell" | "Rent";

  status:
    | "active"
    | "inactive";

  enquiries: number;

  image: string;

  category: Category;
  area: string;

  bedrooms: string;
  bathrooms: string;
  furnishing: string;

  floor: string;
  parking: string;

  facing: string;
  roadWidth: string;

  power: string;
  loadingFacility: string;
  truckAccess: string;

  accommodation: string;
  facilities: string;

  description: string;

  ownerType: string;
  ownerName: string;
  phone: string;
  email: string;

  createdAt: string;
};

const initialFormData: FormData = {
  purpose: "",
  category: "",
  propertyType: "",

  title: "",
  location: "",
  price: "",
  area: "",

  bedrooms: "",
  bathrooms: "",
  furnishing: "",

  floor: "",
  parking: "",

  facing: "",
  roadWidth: "",

  power: "",
  loadingFacility: "",
  truckAccess: "",

  accommodation: "",
  facilities: "",

  description: "",

  ownerType: "",
  ownerName: "",
  phone: "",
  email: "",
};

const propertyTypes:
  Record<Category, string[]> = {
  residential: [
    "Apartment",
    "Independent House",
    "Villa",
    "Penthouse",
    "Studio Apartment",
    "Independent Floor",
    "Farmhouse",
  ],

  commercial: [
    "Office Space",
    "Shop",
    "Showroom",
    "Commercial Building",
    "Co-working Space",
  ],

  land: [
    "Residential Plot",
    "Commercial Plot",
    "Agricultural Land",
    "Farm Land",
  ],

  industrial: [
    "Warehouse",
    "Factory",
    "Industrial Shed",
  ],

  rental: [
    "PG / Hostel",
    "Co-living",
    "Guest House",
  ],
};

const steps = [
  "Purpose",
  "Property",
  "Details",
  "Features",
  "Photos",
  "Contact",
  "Preview",
];

function ListProperty() {
  const navigate =
    useNavigate();

  const currentUser =
    getCurrentUser();

  const [step, setStep] =
    useState(1);

  const [
    formData,
    setFormData,
  ] =
    useState<FormData>(
      () => ({
        ...initialFormData,

        ownerName:
          currentUser?.fullName ||
          "",

        phone:
          currentUser?.phoneNumber ||
          "",

        email:
          currentUser?.email ||
          "",
      })
    );

  const [
    imageFiles,
    setImageFiles,
  ] =
    useState<File[]>([]);

  const [
    imagePreviews,
    setImagePreviews,
  ] =
    useState<string[]>([]);

  const [
    published,
    setPublished,
  ] =
    useState(false);

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const selectPurpose = (
    purpose: Purpose
  ) => {
    setFormData(
      (previous) => ({
        ...previous,
        purpose,
      })
    );
  };

  const selectCategory = (
    category: Category
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        category,

        propertyType: "",

        bedrooms: "",
        bathrooms: "",
        furnishing: "",

        floor: "",
        parking: "",

        facing: "",
        roadWidth: "",

        power: "",
        loadingFacility: "",
        truckAccess: "",

        accommodation: "",
        facilities: "",
      })
    );
  };

  const handleImages = (
    event:
      ChangeEvent<HTMLInputElement>
  ) => {
    const files =
      Array.from(
        event.target.files ||
          []
      );

    if (
      files.length === 0
    ) {
      return;
    }

    const availableSlots =
      6 -
      imageFiles.length;

    const selectedFiles =
      files.slice(
        0,
        availableSlots
      );

    setImageFiles(
      (previous) => [
        ...previous,
        ...selectedFiles,
      ]
    );

    const previews =
      selectedFiles.map(
        (file) =>
          URL.createObjectURL(
            file
          )
      );

    setImagePreviews(
      (previous) => [
        ...previous,
        ...previews,
      ]
    );

    event.target.value =
      "";
  };

  const removeImage = (
    index: number
  ) => {
    URL.revokeObjectURL(
      imagePreviews[index]
    );

    setImageFiles(
      (previous) =>
        previous.filter(
          (
            _,
            itemIndex
          ) =>
            itemIndex !==
            index
        )
    );

    setImagePreviews(
      (previous) =>
        previous.filter(
          (
            _,
            itemIndex
          ) =>
            itemIndex !==
            index
        )
    );
  };

  const canContinue =
    () => {
      switch (step) {
        case 1:
          return (
            formData.purpose !==
            ""
          );

        case 2:
          return (
            formData.category !==
              "" &&
            formData.propertyType !==
              ""
          );

        case 3:
          return (
            formData.title.trim() !==
              "" &&
            formData.location !==
              "" &&
            formData.price.trim() !==
              "" &&
            formData.area.trim() !==
              ""
          );

        case 4:
          return true;

        case 5:
          return true;

        case 6:
          return (
            formData.ownerType !==
              "" &&
            formData.ownerName.trim() !==
              "" &&
            formData.phone.trim() !==
              "" &&
            formData.email.trim() !==
              ""
          );

        default:
          return true;
      }
    };

  const nextStep =
    () => {
      if (
        !canContinue()
      ) {
        alert(
          "Please complete the required fields before continuing."
        );

        return;
      }

      setStep(
        (previous) =>
          Math.min(
            previous + 1,
            steps.length
          )
      );

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

  const previousStep =
    () => {
      setStep(
        (previous) =>
          Math.max(
            previous - 1,
            1
          )
      );

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

  const handlePublish = (
    event:
      FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.purpose ||
      !formData.category ||
      !formData.propertyType ||
      !formData.title.trim() ||
      !formData.location ||
      !formData.price.trim() ||
      !formData.area.trim() ||
      !formData.ownerType ||
      !formData.ownerName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      alert(
        "Please complete all required fields before publishing."
      );

      return;
    }

    if (!currentUser) {
      navigate(
        "/login",
        {
          replace: true,
        }
      );

      return;
    }

    const savedListings =
      getSavedListings();

    const priceNumber =
      Number(
        formData.price
      );

    if (
      Number.isNaN(
        priceNumber
      ) ||
      priceNumber <= 0
    ) {
      alert(
        "Please enter a valid property price."
      );

      return;
    }

    const formattedPrice =
      formData.purpose ===
      "rent"
        ? `₹${priceNumber.toLocaleString(
            "en-IN"
          )} / month`
        : `₹${priceNumber.toLocaleString(
            "en-IN"
          )}`;

    const newListing:
      StoredListing = {
      id:
        Date.now(),

      ownerUserId:
        currentUser.id,

      title:
        formData.title.trim(),

      location:
        formData.location,

      price:
        formattedPrice,

      rawPrice:
        formData.price,

      type:
        formData.propertyType,

      purpose:
        formData.purpose ===
        "sell"
          ? "Sell"
          : "Rent",

      status:
        "active",

      enquiries:
        0,

      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=88",

      category:
        formData.category,

      area:
        formData.area,

      bedrooms:
        formData.bedrooms,

      bathrooms:
        formData.bathrooms,

      furnishing:
        formData.furnishing,

      floor:
        formData.floor,

      parking:
        formData.parking,

      facing:
        formData.facing,

      roadWidth:
        formData.roadWidth,

      power:
        formData.power,

      loadingFacility:
        formData.loadingFacility,

      truckAccess:
        formData.truckAccess,

      accommodation:
        formData.accommodation,

      facilities:
        formData.facilities,

      description:
        formData.description.trim(),

      ownerType:
        formData.ownerType,

      ownerName:
        formData.ownerName.trim(),

      phone:
        formData.phone.trim(),

      email:
        formData.email.trim(),

      createdAt:
        new Date().toISOString(),
    };

    const updatedListings:
      StoredListing[] = [
      newListing,
      ...savedListings,
    ];

    localStorage.setItem(
      "homeNestListings",
      JSON.stringify(
        updatedListings
      )
    );

    setPublished(true);

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  };

  const resetForm =
    () => {
      imagePreviews.forEach(
        (preview) =>
          URL.revokeObjectURL(
            preview
          )
      );

      setFormData({
        ...initialFormData,

        ownerName:
          currentUser?.fullName ||
          "",

        phone:
          currentUser?.phoneNumber ||
          "",

        email:
          currentUser?.email ||
          "",
      });

      setImageFiles([]);

      setImagePreviews([]);

      setPublished(false);

      setStep(1);
    };

  if (published) {
    return (
      <div className="list-property-page">
        <Navbar
          showListProperty={
            false
          }
        />

        <main className="listing-success-wrapper">
          <section className="listing-success">
            <div className="success-icon">
              ✓
            </div>

            <span className="form-eyebrow">
              LISTING SUBMITTED
            </span>

            <h1>
              Your property has
              been submitted
            </h1>

            <p>
              Your property has
              been saved
              successfully and is
              now available in
              your My Listings
              dashboard.
            </p>

            <div className="success-property">
              <span>
                Property
              </span>

              <strong>
                {
                  formData.title
                }
              </strong>

              <span>
                Location
              </span>

              <strong>
                {
                  formData.location
                }
              </strong>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="primary-form-button"
                onClick={() =>
                  navigate(
                    "/my-listings"
                  )
                }
              >
                View My Listings
              </button>

              <button
                type="button"
                className="secondary-form-button"
                onClick={
                  resetForm
                }
              >
                List Another
                Property
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="list-property-page">
      <Navbar
        showListProperty={
          false
        }
      />

      <main className="list-property-main">
        <div className="list-property-breadcrumb">
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            List Property
          </span>
        </div>

        <section className="list-property-heading">
          <span className="form-eyebrow">
            OWNER & AGENT
            PORTAL
          </span>

          <h1>
            List Your Property
          </h1>

          <p>
            Add your property
            details and connect
            with interested
            buyers or tenants
            through HomeNest.
          </p>
        </section>

        <div className="listing-layout">
          <aside className="listing-progress-card">
            <span className="progress-small">
              YOUR PROGRESS
            </span>

            <h2>
              Property Listing
            </h2>

            <p>
              Step {step} of{" "}
              {steps.length}
            </p>

            <div className="listing-progress">
              {steps.map(
                (
                  stepName,
                  index
                ) => {
                  const stepNumber =
                    index +
                    1;

                  return (
                    <div
                      key={
                        stepName
                      }
                      className={`progress-step ${
                        stepNumber ===
                        step
                          ? "current"
                          : ""
                      } ${
                        stepNumber <
                        step
                          ? "completed"
                          : ""
                      }`}
                    >
                      <div className="progress-number">
                        {stepNumber <
                        step
                          ? "✓"
                          : stepNumber}
                      </div>

                      <div>
                        <strong>
                          {
                            stepName
                          }
                        </strong>

                        <span>
                          {getStepDescription(
                            stepNumber
                          )}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </aside>

          <form
            className="listing-form-card"
            onSubmit={
              handlePublish
            }
          >
            <div className="mobile-progress">
              <span>
                Step {step} of{" "}
                {steps.length}
              </span>

              <strong>
                {
                  steps[
                    step - 1
                  ]
                }
              </strong>

              <div>
                <span
                  style={{
                    width: `${
                      (step /
                        steps.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {step === 1 && (
              <PurposeStep
                selected={
                  formData.purpose
                }
                onSelect={
                  selectPurpose
                }
              />
            )}

            {step === 2 && (
              <PropertyStep
                formData={
                  formData
                }
                selectCategory={
                  selectCategory
                }
                handleInputChange={
                  handleInputChange
                }
              />
            )}

            {step === 3 && (
              <BasicDetailsStep
                formData={
                  formData
                }
                handleInputChange={
                  handleInputChange
                }
              />
            )}

            {step === 4 && (
              <FeaturesStep
                formData={
                  formData
                }
                handleInputChange={
                  handleInputChange
                }
              />
            )}

            {step === 5 && (
              <PhotosStep
                imagePreviews={
                  imagePreviews
                }
                handleImages={
                  handleImages
                }
                removeImage={
                  removeImage
                }
              />
            )}

            {step === 6 && (
              <ContactStep
                formData={
                  formData
                }
                handleInputChange={
                  handleInputChange
                }
              />
            )}

            {step === 7 && (
              <PreviewStep
                formData={
                  formData
                }
                imagePreviews={
                  imagePreviews
                }
              />
            )}

            <div className="form-navigation">
              {step > 1 ? (
                <button
                  type="button"
                  className="secondary-form-button"
                  onClick={
                    previousStep
                  }
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step <
              steps.length ? (
                <button
                  type="button"
                  className="primary-form-button"
                  onClick={
                    nextStep
                  }
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="primary-form-button publish-button"
                >
                  Publish Property
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PurposeStep({
  selected,
  onSelect,
}: {
  selected:
    FormData["purpose"];

  onSelect: (
    purpose: Purpose
  ) => void;
}) {
  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 01
      </span>

      <h2>
        What do you want to do?
      </h2>

      <p className="step-description">
        Choose whether you want
        to sell your property or
        find a tenant.
      </p>

      <div className="purpose-grid">
        <button
          type="button"
          className={`selection-card ${
            selected === "sell"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            onSelect("sell")
          }
        >
          <span className="selection-icon">
            ₹
          </span>

          <strong>
            Sell Property
          </strong>

          <p>
            List your property
            for buyers looking to
            purchase.
          </p>

          <span className="selection-check">
            ✓
          </span>
        </button>

        <button
          type="button"
          className={`selection-card ${
            selected === "rent"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            onSelect("rent")
          }
        >
          <span className="selection-icon">
            ⌂
          </span>

          <strong>
            Rent Out Property
          </strong>

          <p>
            Find tenants for your
            residential or
            commercial property.
          </p>

          <span className="selection-check">
            ✓
          </span>
        </button>
      </div>
    </section>
  );
}

function PropertyStep({
  formData,
  selectCategory,
  handleInputChange,
}: {
  formData: FormData;

  selectCategory: (
    category: Category
  ) => void;

  handleInputChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  const categories: {
    value: Category;
    title: string;
    description: string;
    icon: string;
  }[] = [
    {
      value:
        "residential",
      title:
        "Residential",
      description:
        "Apartments, houses, villas",
      icon: "⌂",
    },
    {
      value:
        "commercial",
      title:
        "Commercial",
      description:
        "Offices, shops, showrooms",
      icon: "▤",
    },
    {
      value: "land",
      title:
        "Plots & Land",
      description:
        "Residential, commercial, agricultural",
      icon: "◇",
    },
    {
      value:
        "industrial",
      title:
        "Industrial",
      description:
        "Warehouses, factories, sheds",
      icon: "▦",
    },
    {
      value: "rental",
      title:
        "Rental & PG",
      description:
        "PG, co-living, guest houses",
      icon: "▥",
    },
  ];

  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 02
      </span>

      <h2>
        Select Property Type
      </h2>

      <p className="step-description">
        First choose the property
        category, then select the
        specific type.
      </p>

      <label className="form-label">
        Property Category *
      </label>

      <div className="category-selection-grid">
        {categories.map(
          (category) => (
            <button
              key={
                category.value
              }
              type="button"
              className={`category-selection-card ${
                formData.category ===
                category.value
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectCategory(
                  category.value
                )
              }
            >
              <span>
                {
                  category.icon
                }
              </span>

              <strong>
                {
                  category.title
                }
              </strong>

              <small>
                {
                  category.description
                }
              </small>
            </button>
          )
        )}
      </div>

      {formData.category && (
        <div className="form-field property-type-field">
          <label htmlFor="propertyType">
            Property Type *
          </label>

          <select
            id="propertyType"
            name="propertyType"
            value={
              formData.propertyType
            }
            onChange={
              handleInputChange
            }
          >
            <option value="">
              Select property
              type
            </option>

            {propertyTypes[
              formData.category
            ].map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              )
            )}
          </select>
        </div>
      )}
    </section>
  );
}

function BasicDetailsStep({
  formData,
  handleInputChange,
}: {
  formData: FormData;

  handleInputChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 03
      </span>

      <h2>
        Basic Property Details
      </h2>

      <p className="step-description">
        Enter the main
        information buyers or
        tenants need to see.
      </p>

      <div className="form-field">
        <label htmlFor="title">
          Property Title *
        </label>

        <input
          id="title"
          name="title"
          value={
            formData.title
          }
          onChange={
            handleInputChange
          }
          placeholder="Example: Premium 3 BHK Villa"
        />
      </div>

      <div className="form-two-columns">
        <div className="form-field">
          <label htmlFor="location">
            Location *
          </label>

          <select
            id="location"
            name="location"
            value={
              formData.location
            }
            onChange={
              handleInputChange
            }
          >
            <option value="">
              Select location
            </option>

            <option value="Guntur">
              Guntur
            </option>

            <option value="Vijayawada">
              Vijayawada
            </option>

            <option value="Tenali">
              Tenali
            </option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="area">
            Area *
          </label>

          <div className="input-with-unit">
            <input
              id="area"
              name="area"
              type="number"
              min="1"
              value={
                formData.area
              }
              onChange={
                handleInputChange
              }
              placeholder="2200"
            />

            <span>
              sq.ft
            </span>
          </div>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="price">
          {formData.purpose ===
          "rent"
            ? "Monthly Rent *"
            : "Expected Price *"}
        </label>

        <div className="input-with-unit price-input">
          <span>₹</span>

          <input
            id="price"
            name="price"
            type="number"
            min="1"
            value={
              formData.price
            }
            onChange={
              handleInputChange
            }
            placeholder={
              formData.purpose ===
              "rent"
                ? "25000"
                : "7500000"
            }
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="description">
          Property Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={6}
          value={
            formData.description
          }
          onChange={
            handleInputChange
          }
          placeholder="Describe the property, nearby facilities, connectivity and other useful information..."
        />

        <small className="field-help">
          Add useful information
          that helps people
          understand the
          property.
        </small>
      </div>
    </section>
  );
}

function FeaturesStep({
  formData,
  handleInputChange,
}: {
  formData: FormData;

  handleInputChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 04
      </span>

      <h2>
        Property Features
      </h2>

      <p className="step-description">
        These fields change based
        on the property category
        you selected.
      </p>

      {formData.category ===
        "residential" && (
        <>
          <div className="form-two-columns">
            <div className="form-field">
              <label htmlFor="bedrooms">
                Bedrooms
              </label>

              <select
                id="bedrooms"
                name="bedrooms"
                value={
                  formData.bedrooms
                }
                onChange={
                  handleInputChange
                }
              >
                <option value="">
                  Select bedrooms
                </option>

                <option value="1">
                  1 Bedroom
                </option>

                <option value="2">
                  2 Bedrooms
                </option>

                <option value="3">
                  3 Bedrooms
                </option>

                <option value="4">
                  4 Bedrooms
                </option>

                <option value="5+">
                  5+ Bedrooms
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="bathrooms">
                Bathrooms
              </label>

              <select
                id="bathrooms"
                name="bathrooms"
                value={
                  formData.bathrooms
                }
                onChange={
                  handleInputChange
                }
              >
                <option value="">
                  Select bathrooms
                </option>

                <option value="1">
                  1 Bathroom
                </option>

                <option value="2">
                  2 Bathrooms
                </option>

                <option value="3">
                  3 Bathrooms
                </option>

                <option value="4+">
                  4+ Bathrooms
                </option>
              </select>
            </div>
          </div>

          <FurnishingField
            value={
              formData.furnishing
            }
            onChange={
              handleInputChange
            }
          />
        </>
      )}

      {formData.category ===
        "commercial" && (
        <>
          <div className="form-two-columns">
            <div className="form-field">
              <label htmlFor="floor">
                Floor
              </label>

              <input
                id="floor"
                name="floor"
                value={
                  formData.floor
                }
                onChange={
                  handleInputChange
                }
                placeholder="Example: 3rd Floor"
              />
            </div>

            <div className="form-field">
              <label htmlFor="parking">
                Parking
              </label>

              <select
                id="parking"
                name="parking"
                value={
                  formData.parking
                }
                onChange={
                  handleInputChange
                }
              >
                <option value="">
                  Select
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Not Available">
                  Not Available
                </option>
              </select>
            </div>
          </div>

          <FurnishingField
            value={
              formData.furnishing
            }
            onChange={
              handleInputChange
            }
          />
        </>
      )}

      {formData.category ===
        "land" && (
        <div className="form-two-columns">
          <div className="form-field">
            <label htmlFor="facing">
              Facing
            </label>

            <select
              id="facing"
              name="facing"
              value={
                formData.facing
              }
              onChange={
                handleInputChange
              }
            >
              <option value="">
                Select facing
              </option>

              <option value="East">
                East
              </option>

              <option value="West">
                West
              </option>

              <option value="North">
                North
              </option>

              <option value="South">
                South
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="roadWidth">
              Road Width
            </label>

            <input
              id="roadWidth"
              name="roadWidth"
              value={
                formData.roadWidth
              }
              onChange={
                handleInputChange
              }
              placeholder="Example: 40 ft"
            />
          </div>
        </div>
      )}

      {formData.category ===
        "industrial" && (
        <>
          <div className="form-field">
            <label htmlFor="power">
              Power Capacity
            </label>

            <input
              id="power"
              name="power"
              value={
                formData.power
              }
              onChange={
                handleInputChange
              }
              placeholder="Example: 100 HP"
            />
          </div>

          <div className="form-two-columns">
            <div className="form-field">
              <label htmlFor="loadingFacility">
                Loading Facility
              </label>

              <select
                id="loadingFacility"
                name="loadingFacility"
                value={
                  formData.loadingFacility
                }
                onChange={
                  handleInputChange
                }
              >
                <option value="">
                  Select
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Not Available">
                  Not Available
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="truckAccess">
                Truck Access
              </label>

              <select
                id="truckAccess"
                name="truckAccess"
                value={
                  formData.truckAccess
                }
                onChange={
                  handleInputChange
                }
              >
                <option value="">
                  Select
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Not Available">
                  Not Available
                </option>
              </select>
            </div>
          </div>
        </>
      )}

      {formData.category ===
        "rental" && (
        <>
          <div className="form-two-columns">
            <div className="form-field">
              <label htmlFor="accommodation">
                Accommodation
              </label>

              <input
                id="accommodation"
                name="accommodation"
                value={
                  formData.accommodation
                }
                onChange={
                  handleInputChange
                }
                placeholder="Example: Twin Sharing"
              />
            </div>

            <div className="form-field">
              <label htmlFor="facilities">
                Main Facilities
              </label>

              <input
                id="facilities"
                name="facilities"
                value={
                  formData.facilities
                }
                onChange={
                  handleInputChange
                }
                placeholder="Example: Wi-Fi, Food"
              />
            </div>
          </div>

          <FurnishingField
            value={
              formData.furnishing
            }
            onChange={
              handleInputChange
            }
          />
        </>
      )}

      <div className="feature-info-box">
        <strong>
          Why are these fields
          different?
        </strong>

        <p>
          HomeNest asks only for
          information relevant to
          the selected property
          category.
        </p>
      </div>
    </section>
  );
}

function FurnishingField({
  value,
  onChange,
}: {
  value: string;

  onChange: (
    event:
      ChangeEvent<HTMLSelectElement>
  ) => void;
}) {
  return (
    <div className="form-field">
      <label htmlFor="furnishing">
        Furnishing
      </label>

      <select
        id="furnishing"
        name="furnishing"
        value={value}
        onChange={onChange}
      >
        <option value="">
          Select furnishing
        </option>

        <option value="Unfurnished">
          Unfurnished
        </option>

        <option value="Semi-Furnished">
          Semi-Furnished
        </option>

        <option value="Fully Furnished">
          Fully Furnished
        </option>
      </select>
    </div>
  );
}

function PhotosStep({
  imagePreviews,
  handleImages,
  removeImage,
}: {
  imagePreviews: string[];

  handleImages: (
    event:
      ChangeEvent<HTMLInputElement>
  ) => void;

  removeImage: (
    index: number
  ) => void;
}) {
  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 05
      </span>

      <h2>
        Add Property Photos
      </h2>

      <p className="step-description">
        Upload clear photos of
        the property. You can add
        up to six images.
      </p>

      <label className="image-upload-box">
        <span className="upload-icon">
          ＋
        </span>

        <strong>
          Upload Property Photos
        </strong>

        <p>
          JPG, PNG or WEBP
        </p>

        <small>
          Maximum 6 images
        </small>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={
            handleImages
          }
        />
      </label>

      {imagePreviews.length >
        0 && (
        <>
          <div className="uploaded-images-header">
            <strong>
              Uploaded Photos
            </strong>

            <span>
              {
                imagePreviews.length
              }
              /6
            </span>
          </div>

          <div className="uploaded-images-grid">
            {imagePreviews.map(
              (
                preview,
                index
              ) => (
                <div
                  key={
                    preview
                  }
                  className="uploaded-image"
                >
                  <img
                    src={
                      preview
                    }
                    alt={`Property upload ${
                      index +
                      1
                    }`}
                  />

                  {index ===
                    0 && (
                    <span className="cover-photo">
                      Cover Photo
                    </span>
                  )}

                  <button
                    type="button"
                    aria-label="Remove image"
                    onClick={() =>
                      removeImage(
                        index
                      )
                    }
                  >
                    ×
                  </button>
                </div>
              )
            )}
          </div>
        </>
      )}

      <div className="photo-tip">
        <strong>
          Photo Tip
        </strong>

        <p>
          The uploaded image
          previews are temporary
          until backend image
          storage is added.
        </p>
      </div>
    </section>
  );
}

function ContactStep({
  formData,
  handleInputChange,
}: {
  formData: FormData;

  handleInputChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 06
      </span>

      <h2>
        Contact Details
      </h2>

      <p className="step-description">
        Interested users will
        use these details to
        contact you.
      </p>

      <div className="form-field">
        <label htmlFor="ownerType">
          You are *
        </label>

        <select
          id="ownerType"
          name="ownerType"
          value={
            formData.ownerType
          }
          onChange={
            handleInputChange
          }
        >
          <option value="">
            Select
          </option>

          <option value="Owner">
            Property Owner
          </option>

          <option value="Agent">
            Real Estate Agent
          </option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="ownerName">
          Full Name *
        </label>

        <input
          id="ownerName"
          name="ownerName"
          value={
            formData.ownerName
          }
          onChange={
            handleInputChange
          }
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-two-columns">
        <div className="form-field">
          <label htmlFor="phone">
            Phone Number *
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={
              formData.phone
            }
            onChange={
              handleInputChange
            }
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={
              formData.email
            }
            onChange={
              handleInputChange
            }
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="privacy-note">
        <span>✓</span>

        <p>
          Your contact details
          will only be used for
          property enquiries and
          listing communication.
        </p>
      </div>
    </section>
  );
}

function PreviewStep({
  formData,
  imagePreviews,
}: {
  formData: FormData;
  imagePreviews: string[];
}) {
  return (
    <section className="form-step">
      <span className="form-eyebrow">
        STEP 07
      </span>

      <h2>
        Preview Your Listing
      </h2>

      <p className="step-description">
        Review the information
        before publishing.
      </p>

      <div className="listing-preview">
        {imagePreviews.length >
        0 ? (
          <img
            className="preview-main-image"
            src={
              imagePreviews[0]
            }
            alt="Property preview"
          />
        ) : (
          <div className="preview-image-placeholder">
            <span>⌂</span>

            <p>
              No property image
              added
            </p>
          </div>
        )}

        <div className="preview-content">
          <div className="preview-tags">
            <span>
              {getCategoryName(
                formData.category
              )}
            </span>

            <span>
              {formData.purpose ===
              "sell"
                ? "For Sale"
                : "For Rent"}
            </span>
          </div>

          <h3>
            {formData.title}
          </h3>

          <p className="preview-location">
            ⌖{" "}
            {formData.location},
            Andhra Pradesh
          </p>

          <strong className="preview-price">
            ₹
            {Number(
              formData.price
            ).toLocaleString(
              "en-IN"
            )}

            {formData.purpose ===
            "rent"
              ? " / month"
              : ""}
          </strong>

          <div className="preview-details-grid">
            <div>
              <span>
                Property Type
              </span>

              <strong>
                {
                  formData.propertyType
                }
              </strong>
            </div>

            <div>
              <span>
                Area
              </span>

              <strong>
                {
                  formData.area
                }{" "}
                sq.ft
              </strong>
            </div>

            <div>
              <span>
                Listed By
              </span>

              <strong>
                {
                  formData.ownerType
                }
              </strong>
            </div>

            <div>
              <span>
                Contact
              </span>

              <strong>
                {
                  formData.phone
                }
              </strong>
            </div>
          </div>

          <PreviewFeatures
            formData={
              formData
            }
          />

          {formData.description && (
            <div className="preview-description">
              <span>
                Description
              </span>

              <p>
                {
                  formData.description
                }
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="publish-note">
        <strong>
          Ready to publish?
        </strong>

        <p>
          By publishing, you
          confirm that the
          property details
          provided are accurate.
        </p>
      </div>
    </section>
  );
}

function PreviewFeatures({
  formData,
}: {
  formData: FormData;
}) {
  const items:
    {
      label: string;
      value: string;
    }[] = [];

  if (
    formData.category ===
    "residential"
  ) {
    if (
      formData.bedrooms
    ) {
      items.push({
        label:
          "Bedrooms",
        value:
          formData.bedrooms,
      });
    }

    if (
      formData.bathrooms
    ) {
      items.push({
        label:
          "Bathrooms",
        value:
          formData.bathrooms,
      });
    }

    if (
      formData.furnishing
    ) {
      items.push({
        label:
          "Furnishing",
        value:
          formData.furnishing,
      });
    }
  }

  if (
    formData.category ===
    "commercial"
  ) {
    if (
      formData.floor
    ) {
      items.push({
        label: "Floor",
        value:
          formData.floor,
      });
    }

    if (
      formData.parking
    ) {
      items.push({
        label:
          "Parking",
        value:
          formData.parking,
      });
    }

    if (
      formData.furnishing
    ) {
      items.push({
        label:
          "Furnishing",
        value:
          formData.furnishing,
      });
    }
  }

  if (
    formData.category ===
    "land"
  ) {
    if (
      formData.facing
    ) {
      items.push({
        label:
          "Facing",
        value:
          formData.facing,
      });
    }

    if (
      formData.roadWidth
    ) {
      items.push({
        label:
          "Road Width",
        value:
          formData.roadWidth,
      });
    }
  }

  if (
    formData.category ===
    "industrial"
  ) {
    if (
      formData.power
    ) {
      items.push({
        label: "Power",
        value:
          formData.power,
      });
    }

    if (
      formData.loadingFacility
    ) {
      items.push({
        label:
          "Loading Facility",
        value:
          formData.loadingFacility,
      });
    }

    if (
      formData.truckAccess
    ) {
      items.push({
        label:
          "Truck Access",
        value:
          formData.truckAccess,
      });
    }
  }

  if (
    formData.category ===
    "rental"
  ) {
    if (
      formData.accommodation
    ) {
      items.push({
        label:
          "Accommodation",
        value:
          formData.accommodation,
      });
    }

    if (
      formData.facilities
    ) {
      items.push({
        label:
          "Facilities",
        value:
          formData.facilities,
      });
    }

    if (
      formData.furnishing
    ) {
      items.push({
        label:
          "Furnishing",
        value:
          formData.furnishing,
      });
    }
  }

  if (
    items.length === 0
  ) {
    return null;
  }

  return (
    <div className="preview-details-grid">
      {items.map(
        (item) => (
          <div
            key={
              item.label
            }
          >
            <span>
              {
                item.label
              }
            </span>

            <strong>
              {
                item.value
              }
            </strong>
          </div>
        )
      )}
    </div>
  );
}

function getSavedListings():
  StoredListing[] {
  const saved =
    localStorage.getItem(
      "homeNestListings"
    );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(
      saved
    ) as StoredListing[];
  } catch {
    return [];
  }
}

function getCategoryName(
  category:
    FormData["category"]
) {
  switch (category) {
    case "residential":
      return "Residential";

    case "commercial":
      return "Commercial";

    case "land":
      return "Plots & Land";

    case "industrial":
      return "Industrial";

    case "rental":
      return "Rental & PG";

    default:
      return "";
  }
}

function getStepDescription(
  step: number
) {
  switch (step) {
    case 1:
      return "Sell or rent";

    case 2:
      return "Category & type";

    case 3:
      return "Basic information";

    case 4:
      return "Property features";

    case 5:
      return "Upload photos";

    case 6:
      return "Owner or agent";

    case 7:
      return "Review & publish";

    default:
      return "";
  }
}

export default ListProperty;