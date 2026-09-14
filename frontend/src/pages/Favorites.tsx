import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  properties,
  type Mode,
  type Property,
  type PropertyCategory,
} from "../data/properties";

import "./Favorites.css";

type StoredListing = {
  id: number;
  ownerUserId?: number;

  title: string;
  location: string;

  price: string;
  rawPrice?: string;

  type: string;

  purpose:
    | "Sell"
    | "Rent";

  status:
    | "active"
    | "inactive";

  enquiries: number;

  image: string;

  category?: string;
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

function Favorites() {
  const navigate =
    useNavigate();

  const [
    favoriteProperties,
    setFavoriteProperties,
  ] =
    useState<Property[]>(
      []
    );

  /* =========================================
     LOAD FAVORITES
  ========================================= */

  useEffect(() => {
    const savedFavorites =
      getSavedFavorites();

    const ownerProperties =
      getOwnerProperties();

    const allProperties =
      [
        ...properties,
        ...ownerProperties,
      ];

    const savedProperties =
      allProperties.filter(
        (property) =>
          savedFavorites.includes(
            property.id
          )
      );

    setFavoriteProperties(
      savedProperties
    );
  }, []);

  /* =========================================
     REMOVE FAVORITE
  ========================================= */

  const removeFavorite = (
    propertyId: number
  ) => {
    const updatedProperties =
      favoriteProperties.filter(
        (property) =>
          property.id !==
          propertyId
      );

    setFavoriteProperties(
      updatedProperties
    );

    const savedFavorites =
      getSavedFavorites();

    const updatedFavoriteIds =
      savedFavorites.filter(
        (id) =>
          id !==
          propertyId
      );

    const userId =
      getCurrentUserId();

    if (userId !== null) {
      saveFavorites(
        userId,
        updatedFavoriteIds
      );
    }
  };

  const getCategoryLabel = (
    property: Property
  ) => {
    switch (
      property.category
    ) {
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
        return property.category;
    }
  };

  const getModeLabel = (
    property: Property
  ) => {
    if (
      property.category ===
        "land" &&
      property.mode ===
        "rent"
    ) {
      return "For Lease";
    }

    return property.mode ===
      "buy"
      ? "For Sale"
      : "For Rent";
  };

  return (
    <div className="favorites-page">
      <Navbar />

      <main className="favorites-main">
        <div className="favorites-breadcrumb">
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span>
            Favorites
          </span>
        </div>

        <section className="favorites-heading">
          <div>
            <span className="favorites-label">
              YOUR SHORTLIST
            </span>

            <h1>
              Favorite
              Properties
            </h1>

            <p>
              View and manage the
              properties you have
              saved for later.
            </p>
          </div>

          {favoriteProperties.length >
            0 && (
            <div className="favorites-count">
              <strong>
                {
                  favoriteProperties.length
                }
              </strong>

              <span>
                {favoriteProperties.length ===
                1
                  ? "Saved Property"
                  : "Saved Properties"}
              </span>
            </div>
          )}
        </section>

        {favoriteProperties.length >
        0 ? (
          <section className="favorites-grid">
            {favoriteProperties.map(
              (
                property
              ) => (
                <article
                  key={
                    property.id
                  }
                  className="favorite-property-card"
                >
                  <div
                    className="favorite-image-wrapper"
                    onClick={() =>
                      navigate(
                        `/properties/${property.id}`
                      )
                    }
                  >
                    <img
                      src={
                        property.image
                      }
                      alt={
                        property.title
                      }
                    />

                    <span className="favorite-badge">
                      {
                        property.badge
                      }
                    </span>

                    <button
                      type="button"
                      className="remove-favorite-button"
                      aria-label="Remove from favorites"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();

                        removeFavorite(
                          property.id
                        );
                      }}
                    >
                      ♥
                    </button>
                  </div>

                  <div className="favorite-card-content">
                    <div className="favorite-card-top">
                      <span className="favorite-category">
                        {getCategoryLabel(
                          property
                        )}
                      </span>

                      <span className="favorite-mode">
                        {getModeLabel(
                          property
                        )}
                      </span>
                    </div>

                    <h2>
                      {
                        property.title
                      }
                    </h2>

                    <p className="favorite-location">
                      ⌖{" "}
                      {
                        property.location
                      }
                    </p>

                    <div className="favorite-details">
                      {property.details.map(
                        (
                          detail,
                          index
                        ) => (
                          <span
                            key={`${detail}-${index}`}
                          >
                            {
                              detail
                            }
                          </span>
                        )
                      )}
                    </div>

                    <div className="favorite-card-footer">
                      <div>
                        <small>
                          Price
                        </small>

                        <strong>
                          {
                            property.priceLabel
                          }
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/properties/${property.id}`
                          )
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </section>
        ) : (
          <section className="favorites-empty">
            <div className="favorites-empty-icon">
              ♡
            </div>

            <h2>
              No Favorite
              Properties Yet
            </h2>

            <p>
              Save properties
              you like and they
              will appear here
              for easy access.
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
        )}
      </main>

      <Footer />
    </div>
  );
}

/* =========================================
   OWNER PROPERTIES
========================================= */

function getOwnerProperties():
  Property[] {
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
        ): property is Property =>
          property !== null
      );
  } catch {
    return [];
  }
}

/* =========================================
   CONVERT LISTING
========================================= */

function convertListingToProperty(
  listing: StoredListing
):
  Property |
  null {
  const category =
    normalizeCategory(
      listing.category
    );

  if (!category) {
    return null;
  }

  const mode:
    Mode =
    listing.purpose ===
    "Sell"
      ? "buy"
      : "rent";

  const actualPrice =
    getActualPrice(
      listing
    );

  const comparablePrice =
    mode === "buy"
      ? actualPrice /
        100000
      : actualPrice /
        1000;

  const area =
    Number(
      listing.area
    ) || 0;

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
      comparablePrice,

    priceLabel:
      listing.price,

    area,

    details:
      buildListingDetails(
        listing
      ),

    badge:
      mode === "buy"
        ? "Owner Listing"
        : "For Rent",

    image:
      listing.image,

    postedDate:
      listing.createdAt ||
      new Date().toISOString(),
  };
}

/* =========================================
   DETAILS
========================================= */

function buildListingDetails(
  listing: StoredListing
) {
  const details:
    string[] = [];

  const area =
    Number(
      listing.area
    );

  if (
    area > 0
  ) {
    details.push(
      `${area} sq.ft`
    );
  }

  if (
    listing.category ===
    "residential"
  ) {
    if (
      listing.bedrooms
    ) {
      details.push(
        `${listing.bedrooms} Beds`
      );
    }

    if (
      listing.bathrooms
    ) {
      details.push(
        `${listing.bathrooms} Baths`
      );
    }

    if (
      listing.furnishing
    ) {
      details.push(
        listing.furnishing
      );
    }
  }

  if (
    listing.category ===
    "commercial"
  ) {
    if (
      listing.floor
    ) {
      details.push(
        listing.floor
      );
    }

    if (
      listing.parking
    ) {
      details.push(
        `Parking: ${listing.parking}`
      );
    }

    if (
      listing.furnishing
    ) {
      details.push(
        listing.furnishing
      );
    }
  }

  if (
    listing.category ===
    "land"
  ) {
    if (
      listing.facing
    ) {
      details.push(
        `${listing.facing} Facing`
      );
    }

    if (
      listing.roadWidth
    ) {
      details.push(
        `${listing.roadWidth} Road`
      );
    }
  }

  if (
    listing.category ===
    "industrial"
  ) {
    if (
      listing.power
    ) {
      details.push(
        listing.power
      );
    }

    if (
      listing.loadingFacility
    ) {
      details.push(
        `Loading: ${listing.loadingFacility}`
      );
    }

    if (
      listing.truckAccess
    ) {
      details.push(
        `Truck Access: ${listing.truckAccess}`
      );
    }
  }

  if (
    listing.category ===
    "rental"
  ) {
    if (
      listing.accommodation
    ) {
      details.push(
        listing.accommodation
      );
    }

    if (
      listing.facilities
    ) {
      details.push(
        listing.facilities
      );
    }

    if (
      listing.furnishing
    ) {
      details.push(
        listing.furnishing
      );
    }
  }

  if (
    details.length === 0
  ) {
    details.push(
      "Property Details Available"
    );
  }

  return details;
}

/* =========================================
   PRICE
========================================= */

function getActualPrice(
  listing:
    StoredListing
) {
  if (
    listing.rawPrice
  ) {
    const parsed =
      Number(
        listing.rawPrice
      );

    if (
      !Number.isNaN(
        parsed
      )
    ) {
      return parsed;
    }
  }

  const numeric =
    listing.price.replace(
      /[^0-9.]/g,
      ""
    );

  const parsed =
    Number(
      numeric
    );

  return Number.isNaN(
    parsed
  )
    ? 0
    : parsed;
}

/* =========================================
   CATEGORY
========================================= */

function normalizeCategory(
  category?: string
):
  PropertyCategory |
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
   FAVORITES
========================================= */

function getCurrentUserId():
  number | null {
  const storages = [
    localStorage,
    sessionStorage,
  ];

  for (const storage of storages) {
    const stored =
      storage.getItem(
        "homeNestCurrentUser"
      );

    if (!stored) {
      continue;
    }

    try {
      const user = JSON.parse(
        stored
      ) as { id?: number };

      if (
        typeof user.id ===
        "number"
      ) {
        return user.id;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function getFavoritesKey(
  userId: number
) {
  return `favorites_${userId}`;
}

function getSavedFavorites():
  number[] {
  const userId =
    getCurrentUserId();

  if (userId === null) {
    return [];
  }

  const key =
    getFavoritesKey(userId);

  const stored =
    localStorage.getItem(key);

  if (stored) {
    try {
      return JSON.parse(
        stored
      ) as number[];
    } catch {
      return [];
    }
  }

  const legacy =
    localStorage.getItem(
      "favorites"
    );

  if (!legacy) {
    return [];
  }

  try {
    const legacyFavorites =
      JSON.parse(legacy) as number[];

    localStorage.setItem(
      key,
      JSON.stringify(
        legacyFavorites
      )
    );

    localStorage.removeItem(
      "favorites"
    );

    return legacyFavorites;
  } catch {
    return [];
  }
}

function saveFavorites(
  userId: number,
  favoriteIds: number[]
) {
  localStorage.setItem(
    getFavoritesKey(userId),
    JSON.stringify(favoriteIds)
  );
}

export default Favorites;