import {
  useEffect,
  useState,
  type ChangeEvent,
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
} from "../utils/authStorage";

import "./EditProperty.css";

type Purpose =
  | "Sell"
  | "Rent";

type Category =
  | "residential"
  | "commercial"
  | "land"
  | "industrial"
  | "rental";

type ListingStatus =
  | "active"
  | "inactive";

type StoredListing = {
  id: number;
  ownerUserId?: number;

  title: string;
  location: string;

  price: string;
  rawPrice?: string;

  type: string;

  purpose: Purpose;

  status:
    ListingStatus;

  enquiries: number;

  image: string;

  category?: Category;

  area?: string;

  bedrooms?: string;
  bathrooms?: string;
  furnishing?: string;

  floor?: string;
  parking?: string;

  facing?: string;
  roadWidth?: string;

  power?: string;
  loadingFacility?: string;
  truckAccess?: string;

  accommodation?: string;
  facilities?: string;

  description?: string;

  ownerType?: string;
  ownerName?: string;
  phone?: string;
  email?: string;

  createdAt?: string;
};

type EditFormData = {
  title: string;
  location: string;

  price: string;

  type: string;

  purpose: Purpose;

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

  image: string;

  status:
    ListingStatus;
};

const initialFormData:
  EditFormData = {
  title: "",
  location: "",
  price: "",
  type: "",

  purpose:
    "Sell",

  category:
    "residential",

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

  ownerType:
    "Owner",

  ownerName: "",
  phone: "",
  email: "",

  image: "",

  status:
    "active",
};

function EditProperty() {
  const navigate =
    useNavigate();

  const currentUser =
    getCurrentUser();

  const { id } =
    useParams();

  const [
    formData,
    setFormData,
  ] =
    useState<EditFormData>(
      initialFormData
    );

  const [
    propertyFound,
    setPropertyFound,
  ] =
    useState(true);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    saved,
    setSaved,
  ] =
    useState(false);

  useEffect(() => {
    if (!currentUser) {
      setPropertyFound(
        false
      );

      setLoading(false);

      return;
    }

    const listings =
      getStoredListings();

    const propertyIndex =
      listings.findIndex(
        (listing) =>
          listing.id ===
          Number(id)
      );

    if (
      propertyIndex === -1
    ) {
      setPropertyFound(
        false
      );

      setLoading(false);

      return;
    }

    let property =
      listings[
        propertyIndex
      ];

    const explicitOwner =
      property.ownerUserId ===
      currentUser.id;

    const legacyOwner =
      property.ownerUserId ===
        undefined &&
      Boolean(
        property.email &&
        currentUser.email &&
        property.email
          .trim()
          .toLowerCase() ===
          currentUser.email
            .trim()
            .toLowerCase()
      );

    if (
      !explicitOwner &&
      !legacyOwner
    ) {
      setPropertyFound(
        false
      );

      setLoading(false);

      return;
    }

    if (
      legacyOwner
    ) {
      property = {
        ...property,
        ownerUserId:
          currentUser.id,
      };

      const migratedListings =
        [...listings];

      migratedListings[
        propertyIndex
      ] = property;

      localStorage.setItem(
        "homeNestListings",
        JSON.stringify(
          migratedListings
        )
      );
    }

    setFormData({
      title:
        property.title ||
        "",

      location:
        property.location ||
        "",

      price:
        property.rawPrice ||
        extractRawPrice(
          property.price
        ),

      type:
        property.type ||
        "",

      purpose:
        property.purpose,

      category:
        property.category ||
        "residential",

      area:
        property.area ||
        "",

      bedrooms:
        property.bedrooms ||
        "",

      bathrooms:
        property.bathrooms ||
        "",

      furnishing:
        property.furnishing ||
        "",

      floor:
        property.floor ||
        "",

      parking:
        property.parking ||
        "",

      facing:
        property.facing ||
        "",

      roadWidth:
        property.roadWidth ||
        "",

      power:
        property.power ||
        "",

      loadingFacility:
        property.loadingFacility ||
        "",

      truckAccess:
        property.truckAccess ||
        "",

      accommodation:
        property.accommodation ||
        "",

      facilities:
        property.facilities ||
        "",

      description:
        property.description ||
        "",

      ownerType:
        property.ownerType ||
        "Owner",

      ownerName:
        property.ownerName ||
        "",

      phone:
        property.phone ||
        "",

      email:
        property.email ||
        "",

      image:
        property.image ||
        "",

      status:
        property.status ||
        "active",
    });

    setLoading(false);
  }, [id]);

  const handleChange = (
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
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  const changeCategory = (
    category: Category
  ) => {
    setFormData(
      (current) => ({
        ...current,

        category,

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

  const handleSubmit = (
    event:
      FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.location ||
      !formData.price.trim() ||
      !formData.type.trim() ||
      !formData.area.trim() ||
      !formData.ownerName.trim() ||
      !formData.phone.trim()
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

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
        "Please enter a valid price."
      );

      return;
    }

    const listings =
      getStoredListings();

    const property =
      listings.find(
        (listing) =>
          listing.id ===
          Number(id)
      );

    if (
      !property ||
      !currentUser
    ) {
      alert(
        "Property could not be found."
      );

      return;
    }

    const ownsProperty =
      property.ownerUserId ===
        currentUser.id ||
      (
        property.ownerUserId ===
          undefined &&
        Boolean(
          property.email &&
          currentUser.email &&
          property.email
            .trim()
            .toLowerCase() ===
            currentUser.email
              .trim()
              .toLowerCase()
        )
      );

    if (!ownsProperty) {
      alert(
        "You can only edit your own property."
      );

      navigate(
        "/my-listings"
      );

      return;
    }

    const formattedPrice =
      formData.purpose ===
      "Rent"
        ? `₹${priceNumber.toLocaleString(
            "en-IN"
          )} / month`
        : `₹${priceNumber.toLocaleString(
            "en-IN"
          )}`;

    const updatedListings:
      StoredListing[] =
      listings.map(
        (listing) => {
          if (
            listing.id !==
            Number(id)
          ) {
            return listing;
          }

          return {
            ...listing,

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
              formData.type.trim(),

            purpose:
              formData.purpose,

            category:
              formData.category,

            area:
              formData.area.trim(),

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

            image:
              formData.image.trim() ||
              listing.image,

            status:
              formData.status,
          };
        }
      );

    localStorage.setItem(
      "homeNestListings",
      JSON.stringify(
        updatedListings
      )
    );

    setSaved(true);

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  };

  if (loading) {
    return (
      <div className="edit-property-page">
        <Navbar />

        <main className="edit-property-main">
          <div className="edit-property-loading">
            Loading
            property...
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!propertyFound) {
    return (
      <div className="edit-property-page">
        <Navbar />

        <main className="edit-property-main">
          <section className="edit-property-not-found">
            <span>⌂</span>

            <h1>
              Property Not Found
            </h1>

            <p>
              This property
              cannot be edited
              because it does
              not exist in your
              listings.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/my-listings"
                )
              }
            >
              Back to My
              Listings
            </button>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  if (saved) {
    return (
      <div className="edit-property-page">
        <Navbar />

        <main className="edit-property-main">
          <section className="edit-property-success">
            <div className="edit-success-icon">
              ✓
            </div>

            <span className="edit-property-eyebrow">
              PROPERTY UPDATED
            </span>

            <h1>
              Property Updated
              Successfully
            </h1>

            <p>
              Your changes have
              been saved
              successfully.
            </p>

            <div className="edit-success-actions">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/properties/${id}`
                  )
                }
              >
                View Property
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() =>
                  navigate(
                    "/my-listings"
                  )
                }
              >
                My Listings
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() =>
                  setSaved(
                    false
                  )
                }
              >
                Edit Again
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="edit-property-page">
      <Navbar />

      <main className="edit-property-main">
        <section className="edit-property-header">
          <span className="edit-property-eyebrow">
            OWNER DASHBOARD
          </span>

          <h1>
            Edit Property
          </h1>

          <p>
            Update all property
            details and save your
            changes.
          </p>
        </section>

        <form
          className="edit-property-form"
          onSubmit={
            handleSubmit
          }
        >
          <section className="edit-property-section">
            <div className="edit-section-heading">
              <span>01</span>

              <div>
                <h2>
                  Basic
                  Information
                </h2>

                <p>
                  Update the main
                  property
                  information.
                </p>
              </div>
            </div>

            <div className="edit-form-grid">
              <div className="edit-field full">
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
                    handleChange
                  }
                />
              </div>

              <div className="edit-field">
                <label htmlFor="purpose">
                  Purpose *
                </label>

                <select
                  id="purpose"
                  name="purpose"
                  value={
                    formData.purpose
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Sell">
                    Sell
                  </option>

                  <option value="Rent">
                    Rent
                  </option>
                </select>
              </div>

              <div className="edit-field">
                <label htmlFor="category">
                  Category *
                </label>

                <select
                  id="category"
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={(
                    event
                  ) =>
                    changeCategory(
                      event.target
                        .value as Category
                    )
                  }
                >
                  <option value="residential">
                    Residential
                  </option>

                  <option value="commercial">
                    Commercial
                  </option>

                  <option value="land">
                    Plots &
                    Land
                  </option>

                  <option value="industrial">
                    Industrial
                  </option>

                  <option value="rental">
                    Rental &
                    PG
                  </option>
                </select>
              </div>

              <div className="edit-field">
                <label htmlFor="type">
                  Property Type *
                </label>

                <input
                  id="type"
                  name="type"
                  value={
                    formData.type
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="edit-field">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </section>

          <section className="edit-property-section">
            <div className="edit-section-heading">
              <span>02</span>

              <div>
                <h2>
                  Property
                  Details
                </h2>

                <p>
                  Update location,
                  area and price.
                </p>
              </div>
            </div>

            <div className="edit-form-grid">
              <div className="edit-field">
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
                    handleChange
                  }
                >
                  <option value="">
                    Select
                    Location
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

              <div className="edit-field">
                <label htmlFor="area">
                  Area *
                </label>

                <input
                  id="area"
                  name="area"
                  type="number"
                  min="1"
                  value={
                    formData.area
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="edit-field full">
                <label htmlFor="price">
                  {formData.purpose ===
                  "Rent"
                    ? "Monthly Rent *"
                    : "Expected Price *"}
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  value={
                    formData.price
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="edit-field full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div>
          </section>

          <PropertyFeatureFields
            formData={
              formData
            }
            handleChange={
              handleChange
            }
          />

          <section className="edit-property-section">
            <div className="edit-section-heading">
              <span>04</span>

              <div>
                <h2>
                  Owner
                  Information
                </h2>

                <p>
                  Update contact
                  details.
                </p>
              </div>
            </div>

            <div className="edit-form-grid">
              <div className="edit-field">
                <label htmlFor="ownerType">
                  Listing By
                </label>

                <select
                  id="ownerType"
                  name="ownerType"
                  value={
                    formData.ownerType
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Owner">
                    Owner
                  </option>

                  <option value="Agent">
                    Agent
                  </option>
                </select>
              </div>

              <div className="edit-field">
                <label htmlFor="ownerName">
                  Name *
                </label>

                <input
                  id="ownerName"
                  name="ownerName"
                  value={
                    formData.ownerName
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="edit-field">
                <label htmlFor="phone">
                  Phone *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="edit-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div>
          </section>

          <section className="edit-property-section">
            <div className="edit-section-heading">
              <span>05</span>

              <div>
                <h2>
                  Property Image
                </h2>

                <p>
                  Update the
                  image URL if
                  required.
                </p>
              </div>
            </div>

            <div className="edit-field full">
              <label htmlFor="image">
                Image URL
              </label>

              <input
                id="image"
                name="image"
                value={
                  formData.image
                }
                onChange={
                  handleChange
                }
              />
            </div>

            {formData.image && (
              <div className="edit-image-preview">
                <img
                  src={
                    formData.image
                  }
                  alt="Property preview"
                />
              </div>
            )}
          </section>

          <div className="edit-property-actions">
            <button
              type="button"
              className="edit-cancel-button"
              onClick={() =>
                navigate(
                  "/my-listings"
                )
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-save-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

function PropertyFeatureFields({
  formData,
  handleChange,
}: {
  formData: EditFormData;

  handleChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <section className="edit-property-section">
      <div className="edit-section-heading">
        <span>03</span>

        <div>
          <h2>
            Property Features
          </h2>

          <p>
            Edit features
            relevant to the
            selected category.
          </p>
        </div>
      </div>

      <div className="edit-form-grid">
        {formData.category ===
          "residential" && (
          <>
            <div className="edit-field">
              <label htmlFor="bedrooms">
                Bedrooms
              </label>

              <input
                id="bedrooms"
                name="bedrooms"
                value={
                  formData.bedrooms
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="edit-field">
              <label htmlFor="bathrooms">
                Bathrooms
              </label>

              <input
                id="bathrooms"
                name="bathrooms"
                value={
                  formData.bathrooms
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <FurnishingEditField
              value={
                formData.furnishing
              }
              onChange={
                handleChange
              }
            />
          </>
        )}

        {formData.category ===
          "commercial" && (
          <>
            <div className="edit-field">
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
                  handleChange
                }
              />
            </div>

            <div className="edit-field">
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
                  handleChange
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

            <FurnishingEditField
              value={
                formData.furnishing
              }
              onChange={
                handleChange
              }
            />
          </>
        )}

        {formData.category ===
          "land" && (
          <>
            <div className="edit-field">
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
                  handleChange
                }
              >
                <option value="">
                  Select
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

            <div className="edit-field">
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
                  handleChange
                }
              />
            </div>
          </>
        )}

        {formData.category ===
          "industrial" && (
          <>
            <div className="edit-field">
              <label htmlFor="power">
                Power
              </label>

              <input
                id="power"
                name="power"
                value={
                  formData.power
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="edit-field">
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
                  handleChange
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

            <div className="edit-field">
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
                  handleChange
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
          </>
        )}

        {formData.category ===
          "rental" && (
          <>
            <div className="edit-field">
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
                  handleChange
                }
              />
            </div>

            <div className="edit-field">
              <label htmlFor="facilities">
                Facilities
              </label>

              <input
                id="facilities"
                name="facilities"
                value={
                  formData.facilities
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <FurnishingEditField
              value={
                formData.furnishing
              }
              onChange={
                handleChange
              }
            />
          </>
        )}
      </div>
    </section>
  );
}

function FurnishingEditField({
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
    <div className="edit-field">
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
          Select
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

function getStoredListings():
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

function extractRawPrice(
  price: string
) {
  return price.replace(
    /[^0-9.]/g,
    ""
  );
}

export default EditProperty;