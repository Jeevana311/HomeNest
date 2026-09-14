import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  properties,
  type Category,
  type Mode,
  type Property,
  type PropertyCategory,
} from "../data/properties";
import { getProperties } from "../utils/api";

import "./Properties.css";

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

const categoryOptions: {
  value: Category;
  label: string;
}[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "land",
    label: "Plots & Land",
  },
  {
    value: "industrial",
    label: "Industrial",
  },
  {
    value: "rental",
    label: "Rental & PG",
  },
];

const validCategories: Category[] = [
  "all",
  "residential",
  "commercial",
  "land",
  "industrial",
  "rental",
];

function Properties() {
  const navigate =
    useNavigate();

  const [
    searchParams,
    setSearchParams,
  ] =
    useSearchParams();

  const modeFromUrl: Mode =
    searchParams.get("mode") ===
    "rent"
      ? "rent"
      : "buy";

  const categoryParam =
    searchParams.get(
      "category"
    );

  const categoryFromUrl:
    Category =
    categoryParam &&
    validCategories.includes(
      categoryParam as Category
    )
      ? (categoryParam as Category)
      : "all";

  const [mode, setMode] =
    useState<Mode>(
      modeFromUrl
    );

  const [
    category,
    setCategory,
  ] =
    useState<Category>(
      categoryFromUrl
    );

  const [
    location,
    setLocation,
  ] =
    useState(
      searchParams.get(
        "location"
      ) || ""
    );

  const [
    propertyType,
    setPropertyType,
  ] =
    useState(
      searchParams.get(
        "type"
      ) || ""
    );

  const [
    priceRange,
    setPriceRange,
  ] =
    useState(
      searchParams.get(
        "price"
      ) || ""
    );

  const [
    bedrooms,
    setBedrooms,
  ] =
    useState("");

  const [
    sortBy,
    setSortBy,
  ] =
    useState(
      "relevance"
    );

  const [
    favorites,
    setFavorites,
  ] =
    useState<number[]>(
      []
    );

  const [
    ownerProperties,
    setOwnerProperties,
  ] =
    useState<Property[]>(
      []
    );

  const [
    serverProperties,
    setServerProperties,
  ] =
    useState<Property[]>(
      []
    );

  /* =========================================
     LOAD FAVORITES + OWNER LISTINGS
  ========================================= */

  useEffect(() => {
    setFavorites(
      getSavedFavorites()
    );

    setOwnerProperties(
      getOwnerProperties()
    );

    getProperties()
      .then(setServerProperties)
      .catch(() => {
        setServerProperties([]);
      });
  }, []);

  /* =========================================
     ALL PUBLIC PROPERTIES
  ========================================= */

  const allProperties =
    useMemo(
      () => [
        ...(serverProperties.length > 0
          ? serverProperties
          : properties),
        ...ownerProperties,
      ],
      [ownerProperties, serverProperties]
    );

  const showBedrooms =
    category === "all" ||
    category ===
      "residential";

  /* =========================================
     FILTER + SORT
  ========================================= */

  const filteredProperties =
    useMemo(() => {
      const results =
        allProperties.filter(
          (property) => {
            if (
              property.mode !==
              mode
            ) {
              return false;
            }

            if (
              category !==
                "all" &&
              property.category !==
                category
            ) {
              return false;
            }

            if (
              location &&
              property.location !==
                location
            ) {
              return false;
            }

            if (
              propertyType &&
              property.type !==
                propertyType
            ) {
              return false;
            }

            if (
              bedrooms &&
              property.category ===
                "residential"
            ) {
              const bedroomDetail =
                property.details.find(
                  (detail) =>
                    detail
                      .toLowerCase()
                      .includes(
                        "beds"
                      )
                );

              if (
                !bedroomDetail
              ) {
                return false;
              }

              const bedroomText =
                bedroomDetail.split(
                  " "
                )[0];

              const bedroomCount =
                Number(
                  bedroomText.replace(
                    "+",
                    ""
                  )
                );

              if (
                bedrooms ===
                "4"
              ) {
                if (
                  bedroomCount <
                  4
                ) {
                  return false;
                }
              } else if (
                bedroomCount !==
                Number(
                  bedrooms
                )
              ) {
                return false;
              }
            }

            if (
              priceRange
            ) {
              const [
                minimumText,
                maximumText,
              ] =
                priceRange.split(
                  "-"
                );

              const minimum =
                Number(
                  minimumText
                );

              const maximum =
                Number(
                  maximumText
                );

              if (
                property.price <
                minimum
              ) {
                return false;
              }

              if (
                maximum >
                  0 &&
                property.price >
                  maximum
              ) {
                return false;
              }
            }

            return true;
          }
        );

      return [
        ...results,
      ].sort(
        (
          first,
          second
        ) => {
          if (
            sortBy ===
            "price-low"
          ) {
            return (
              first.price -
              second.price
            );
          }

          if (
            sortBy ===
            "price-high"
          ) {
            return (
              second.price -
              first.price
            );
          }

          if (
            sortBy ===
            "area"
          ) {
            return (
              second.area -
              first.area
            );
          }

          if (
            sortBy ===
            "newest"
          ) {
            return (
              Date.parse(
                second.postedDate
              ) -
              Date.parse(
                first.postedDate
              )
            );
          }

          return (
            first.id -
            second.id
          );
        }
      );
    }, [
      allProperties,
      mode,
      category,
      location,
      propertyType,
      priceRange,
      bedrooms,
      sortBy,
    ]);

  /* =========================================
     APPLY FILTERS
  ========================================= */

  const applyFilters =
    () => {
      const params =
        new URLSearchParams();

      params.set(
        "mode",
        mode
      );

      if (
        category !==
        "all"
      ) {
        params.set(
          "category",
          category
        );
      }

      if (location) {
        params.set(
          "location",
          location
        );
      }

      if (
        propertyType
      ) {
        params.set(
          "type",
          propertyType
        );
      }

      if (
        priceRange
      ) {
        params.set(
          "price",
          priceRange
        );
      }

      setSearchParams(
        params
      );
    };

  /* =========================================
     RESET
  ========================================= */

  const resetFilters =
    () => {
      setMode("buy");

      setCategory(
        "all"
      );

      setLocation("");

      setPropertyType(
        ""
      );

      setPriceRange(
        ""
      );

      setBedrooms("");

      setSortBy(
        "relevance"
      );

      setSearchParams({
        mode: "buy",
      });
    };

  const changeMode = (
    newMode: Mode
  ) => {
    setMode(newMode);

    setPriceRange(
      ""
    );
  };

  const changeCategory = (
    newCategory:
      Category
  ) => {
    setCategory(
      newCategory
    );

    setPropertyType(
      ""
    );

    setBedrooms("");
  };

  /* =========================================
     FAVORITES
  ========================================= */

  const toggleFavorite = (
    id: number
  ) => {
    const userId =
      getCurrentUserId();

    if (userId === null) {
      navigate(
        "/login",
        {
          state: {
            from: {
              pathname: "/properties",
              search:
                searchParams.toString()
                  ? `?${searchParams.toString()}`
                  : "",
            },
          },
        }
      );

      return;
    }

    setFavorites(
      (current) => {
        const updatedFavorites =
          current.includes(id)
            ? current.filter(
                (propertyId) =>
                  propertyId !== id
              )
            : [...current, id];

        saveFavorites(
          userId,
          updatedFavorites
        );

        return updatedFavorites;
      }
    );
  };

  const getCategoryLabel = (
    propertyCategory:
      PropertyCategory
  ) => {
    switch (
      propertyCategory
    ) {
      case "land":
        return "Plots & Land";

      case "rental":
        return "Rental & PG";

      default:
        return (
          propertyCategory
            .charAt(0)
            .toUpperCase() +
          propertyCategory.slice(
            1
          )
        );
    }
  };

  return (
    <div className="properties-page">
      <Navbar />

      <main>
        <section className="properties-heading">
          <p>
            <Link to="/">
              Home
            </Link>{" "}
            / Properties
          </p>

          <h1>
            Find Your Property
          </h1>

          <span>
            Search residential,
            commercial, land,
            industrial and rental
            properties across
            Guntur, Vijayawada
            and Tenali.
          </span>
        </section>

        <section className="properties-search-panel">
          <div className="mode-toggle">
            <button
              type="button"
              className={
                mode ===
                "buy"
                  ? "active"
                  : ""
              }
              onClick={() =>
                changeMode(
                  "buy"
                )
              }
            >
              Buy
            </button>

            <button
              type="button"
              className={
                mode ===
                "rent"
                  ? "active"
                  : ""
              }
              onClick={() =>
                changeMode(
                  "rent"
                )
              }
            >
              Rent
            </button>
          </div>

          <div className="properties-filter-grid">
            <label>
              Location

              <select
                value={
                  location
                }
                onChange={(
                  event
                ) =>
                  setLocation(
                    event
                      .target
                      .value
                  )
                }
              >
                <option value="">
                  All Locations
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
            </label>

            <label>
              Property Type

              <select
                value={
                  propertyType
                }
                onChange={(
                  event
                ) =>
                  setPropertyType(
                    event
                      .target
                      .value
                  )
                }
              >
                <option value="">
                  All Property
                  Types
                </option>

                <optgroup label="Residential">
                  <option value="apartment">
                    Apartment
                  </option>

                  <option value="independent-house">
                    Independent
                    House
                  </option>

                  <option value="villa">
                    Villa
                  </option>

                  <option value="penthouse">
                    Penthouse
                  </option>

                  <option value="studio-apartment">
                    Studio
                    Apartment
                  </option>

                  <option value="independent-floor">
                    Independent
                    Floor
                  </option>

                  <option value="farmhouse">
                    Farmhouse
                  </option>
                </optgroup>

                <optgroup label="Commercial">
                  <option value="office-space">
                    Office Space
                  </option>

                  <option value="shop">
                    Shop
                  </option>

                  <option value="showroom">
                    Showroom
                  </option>

                  <option value="commercial-building">
                    Commercial
                    Building
                  </option>

                  <option value="coworking-space">
                    Co-working
                    Space
                  </option>
                </optgroup>

                <optgroup label="Plots & Land">
                  <option value="residential-plot">
                    Residential
                    Plot
                  </option>

                  <option value="commercial-plot">
                    Commercial
                    Plot
                  </option>

                  <option value="agricultural-land">
                    Agricultural
                    Land
                  </option>

                  <option value="farm-land">
                    Farm Land
                  </option>
                </optgroup>

                <optgroup label="Industrial">
                  <option value="warehouse">
                    Warehouse
                  </option>

                  <option value="factory">
                    Factory
                  </option>

                  <option value="industrial-shed">
                    Industrial
                    Shed
                  </option>
                </optgroup>

                <optgroup label="Rental & PG">
                  <option value="pg-hostel">
                    PG / Hostel
                  </option>

                  <option value="co-living">
                    Co-living
                  </option>

                  <option value="guest-house">
                    Guest House
                  </option>
                </optgroup>
              </select>
            </label>

            <label>
              {mode ===
              "buy"
                ? "Price Range"
                : "Monthly Rent"}

              <select
                value={
                  priceRange
                }
                onChange={(
                  event
                ) =>
                  setPriceRange(
                    event
                      .target
                      .value
                  )
                }
              >
                <option value="">
                  Any Price
                </option>

                {mode ===
                "buy" ? (
                  <>
                    <option value="0-50">
                      Below ₹50L
                    </option>

                    <option value="50-100">
                      ₹50L –
                      ₹1Cr
                    </option>

                    <option value="100-0">
                      ₹1Cr+
                    </option>
                  </>
                ) : (
                  <>
                    <option value="0-15">
                      Below
                      ₹15,000
                    </option>

                    <option value="15-30">
                      ₹15,000 –
                      ₹30,000
                    </option>

                    <option value="30-0">
                      ₹30,000+
                    </option>
                  </>
                )}
              </select>
            </label>

            {showBedrooms && (
              <label>
                Bedrooms

                <select
                  value={
                    bedrooms
                  }
                  onChange={(
                    event
                  ) =>
                    setBedrooms(
                      event
                        .target
                        .value
                    )
                  }
                >
                  <option value="">
                    Any
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
                    4+ Bedrooms
                  </option>
                </select>
              </label>
            )}
          </div>

          <div className="filter-actions">
            <button
              type="button"
              className="apply-filter"
              onClick={
                applyFilters
              }
            >
              Search Properties
            </button>

            <button
              type="button"
              className="reset-filter"
              onClick={
                resetFilters
              }
            >
              Reset Filters
            </button>
          </div>
        </section>

        <section className="category-tabs">
          {categoryOptions.map(
            (option) => (
              <button
                key={
                  option.value
                }
                type="button"
                className={
                  category ===
                  option.value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeCategory(
                    option.value
                  )
                }
              >
                {
                  option.label
                }
              </button>
            )
          )}
        </section>

        <section className="results-toolbar">
          <p>
            <strong>
              {
                filteredProperties.length
              }
            </strong>{" "}
            Properties Found
          </p>

          <label>
            Sort By:

            <select
              value={
                sortBy
              }
              onChange={(
                event
              ) =>
                setSortBy(
                  event
                    .target
                    .value
                )
              }
            >
              <option value="relevance">
                Relevance
              </option>

              <option value="price-low">
                Price: Low to
                High
              </option>

              <option value="price-high">
                Price: High to
                Low
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="area">
                Area
              </option>
            </select>
          </label>
        </section>

        {filteredProperties.length >
        0 ? (
          <section className="properties-list-grid">
            {filteredProperties.map(
              (
                property
              ) => {
                const isFavorite =
                  favorites.includes(
                    property.id
                  );

                return (
                  <article
                    className="listing-card"
                    key={
                      property.id
                    }
                    onClick={() =>
                      navigate(
                        `/properties/${property.id}`
                      )
                    }
                  >
                    <div className="listing-image-wrapper">
                      <img
                        src={
                          property.image
                        }
                        alt={
                          property.title
                        }
                      />

                      <span className="listing-badge">
                        {
                          property.badge
                        }
                      </span>

                      <button
                        type="button"
                        className={
                          isFavorite
                            ? "listing-favorite active"
                            : "listing-favorite"
                        }
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          toggleFavorite(
                            property.id
                          );
                        }}
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        {isFavorite
                          ? "♥"
                          : "♡"}
                      </button>
                    </div>

                    <div className="listing-content">
                      <span className="listing-category">
                        {getCategoryLabel(
                          property.category
                        )}
                      </span>

                      <h2>
                        {
                          property.title
                        }
                      </h2>

                      <p className="listing-location">
                        ⌖{" "}
                        {
                          property.location
                        }
                      </p>

                      <p className="listing-price">
                        {
                          property.priceLabel
                        }
                      </p>

                      <div className="listing-details">
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

                      <button
                        type="button"
                        className="view-details"
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          navigate(
                            `/properties/${property.id}`
                          );
                        }}
                      >
                        View Details →
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </section>
        ) : (
          <section className="no-properties">
            <span>
              ⌕
            </span>

            <h2>
              No matching
              properties found
            </h2>

            <p>
              Try changing the
              location, category,
              property type or
              budget.
            </p>

            <button
              type="button"
              onClick={
                resetFilters
              }
            >
              Clear Filters
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* =========================================
   OWNER LISTINGS
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
   CONVERT OWNER LISTING
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
   LISTING DETAILS
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
    const raw =
      Number(
        listing.rawPrice
      );

    if (
      !Number.isNaN(
        raw
      )
    ) {
      return raw;
    }
  }

  const numericText =
    listing.price.replace(
      /[^0-9.]/g,
      ""
    );

  const parsed =
    Number(
      numericText
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
   TYPE
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

export default Properties;