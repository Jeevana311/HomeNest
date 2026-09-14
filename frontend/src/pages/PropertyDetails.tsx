import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  properties,
  type Property,
} from "../data/properties";

import "./PropertyDetails.css";

type OverviewItem = {
  label: string;
  value: string;
};

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

type DisplayProperty =
  Property & {
    customDescription?: string;

    ownerName?: string;
    ownerType?: string;

    ownerPhone?: string;
    ownerEmail?: string;

    isUserListing?: boolean;
  };

function PropertyDetails() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [
    favorite,
    setFavorite,
  ] =
    useState(false);

  const ownerProperties =
    useMemo(
      () =>
        getOwnerProperties(),
      []
    );

  const allProperties:
    DisplayProperty[] =
    useMemo(
      () => [
        ...properties,
        ...ownerProperties,
      ],
      [ownerProperties]
    );

  const property =
    allProperties.find(
      (item) =>
        item.id ===
        Number(id)
    );

  useEffect(() => {
    if (!property) {
      return;
    }

    const savedFavorites =
      getSavedFavorites();

    setFavorite(
      savedFavorites.includes(
        property.id
      )
    );
  }, [property]);

  const toggleFavorite =
    () => {
      if (!property) {
        return;
      }

      const userId =
        getCurrentUserId();

      if (userId === null) {
        navigate(
          "/login",
          {
            state: {
              from: {
                pathname:
                  `/properties/${property.id}`,
                search: "",
              },
            },
          }
        );

        return;
      }

      const savedFavorites =
        getSavedFavorites();

      let updatedFavorites:
        number[];

      if (
        savedFavorites.includes(
          property.id
        )
      ) {
        updatedFavorites =
          savedFavorites.filter(
            (favoriteId) =>
              favoriteId !==
              property.id
          );

        setFavorite(false);
      } else {
        updatedFavorites = [
          ...savedFavorites,
          property.id,
        ];

        setFavorite(true);
      }

      saveFavorites(
        userId,
        updatedFavorites
      );
    };

  if (!property) {
    return (
      <div className="property-details-page">
        <Navbar />

        <main className="property-not-found">
          <h1>
            Property Not Found
          </h1>

          <p>
            The property does
            not exist or may
            have been removed.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/properties"
              )
            }
          >
            Back to Properties
          </button>
        </main>

        <Footer />
      </div>
    );
  }

  const overview =
    getPropertyOverview(
      property
    );

  const amenities =
    getAmenities(
      property
    );

  const description =
    getDescription(
      property
    );

  const ownerName =
    property.ownerName ||
    "HomeNest Agent";

  const ownerType =
    property.ownerType ||
    "Property Consultant";

  const ownerPhone =
    property.ownerPhone ||
    "+91 98765 43210";

  return (
    <div className="property-details-page">
      <Navbar />

      <main className="details-main">
        <div className="details-breadcrumb">
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/properties">
            Properties
          </Link>

          <span>/</span>

          <span>
            {
              property.title
            }
          </span>
        </div>

        <section className="details-header">
          <div>
            <span className="details-category">
              {getCategoryLabel(
                property.category
              )}
            </span>

            <h1>
              {
                property.title
              }
            </h1>

            <p>
              ⌖{" "}
              {
                property.location
              }
              , Andhra Pradesh
            </p>
          </div>

          <div className="details-header-right">
            <h2>
              {
                property.priceLabel
              }
            </h2>

            <button
              type="button"
              className={
                favorite
                  ? "save-property active"
                  : "save-property"
              }
              onClick={
                toggleFavorite
              }
            >
              {favorite
                ? "♥ Saved"
                : "♡ Save Property"}
            </button>
          </div>
        </section>

        <section className="property-main-image">
          <img
            src={
              property.image
            }
            alt={
              property.title
            }
          />

          <span className="property-details-badge">
            {
              property.badge
            }
          </span>
        </section>

        <div className="property-details-layout">
          <div className="property-details-left">
            <section className="property-summary">
              {property.details.map(
                (
                  detail,
                  index
                ) => (
                  <div
                    key={`${detail}-${index}`}
                  >
                    <span>
                      Property
                      Detail
                    </span>

                    <strong>
                      {detail}
                    </strong>
                  </div>
                )
              )}
            </section>

            <section className="details-box">
              <span className="details-label">
                PROPERTY
                INFORMATION
              </span>

              <h2>
                Property
                Overview
              </h2>

              <div className="property-overview-grid">
                {overview.map(
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
            </section>

            <section className="details-box">
              <span className="details-label">
                ABOUT THIS
                PROPERTY
              </span>

              <h2>
                Description
              </h2>

              <p className="details-description">
                {
                  description
                }
              </p>
            </section>

            <section className="details-box">
              <span className="details-label">
                FEATURES
              </span>

              <h2>
                Features &
                Amenities
              </h2>

              <div className="amenities-list">
                {amenities.map(
                  (amenity) => (
                    <span
                      key={
                        amenity
                      }
                    >
                      ✓{" "}
                      {
                        amenity
                      }
                    </span>
                  )
                )}
              </div>
            </section>

            <section className="details-box">
              <span className="details-label">
                LOCATION
              </span>

              <h2>
                Property
                Location
              </h2>

              <div className="property-location-box">
                <span>⌖</span>

                <div>
                  <strong>
                    {
                      property.location
                    }
                    , Andhra
                    Pradesh
                  </strong>

                  <p>
                    Contact the
                    owner or
                    agent for the
                    complete
                    address and
                    visit
                    directions.
                  </p>
                </div>
              </div>

              <div className="map-box">
                <span>⌖</span>

                <strong>
                  {
                    property.location
                  }
                </strong>

                <p>
                  Map integration
                  will be added
                  later.
                </p>
              </div>
            </section>
          </div>

          <aside className="property-contact-card">
            <span className="details-label">
              PROPERTY DETAILS
            </span>

            <div className="owner-profile">
              <div className="owner-avatar">
                {ownerName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <h3>
                  {
                    ownerName
                  }
                </h3>

                <p>
                  {
                    ownerType
                  }
                </p>
              </div>
            </div>

            <div className="owner-phone">
              <span>
                Contact Number
              </span>

              <strong>
                {
                  ownerPhone
                }
              </strong>
            </div>

            <div className="contact-property-info">
              <span>
                Property ID
              </span>

              <strong>
                HN-
                {String(
                  property.id
                ).padStart(
                  4,
                  "0"
                )}
              </strong>
            </div>

            <div className="contact-property-info">
              <span>
                Property Type
              </span>

              <strong>
                {formatType(
                  property.type
                )}
              </strong>
            </div>

            <div className="contact-property-info">
              <span>
                Purpose
              </span>

              <strong>
                {getPurpose(
                  property
                )}
              </strong>
            </div>

            <div className="contact-property-info">
              <span>
                Price
              </span>

              <strong>
                {
                  property.priceLabel
                }
              </strong>
            </div>

            <div className="contact-property-info">
              <span>
                Posted On
              </span>

              <strong>
                {formatDate(
                  property.postedDate
                )}
              </strong>
            </div>

            <button
              type="button"
              className="enquire-now"
              onClick={() =>
                navigate(
                  `/properties/${property.id}/enquire`
                )
              }
            >
              Enquire Now
            </button>

            <button
              type="button"
              className="schedule-visit"
              onClick={() =>
                navigate(
                  `/properties/${property.id}/schedule-visit`
                )
              }
            >
              Schedule Visit
            </button>

            <p className="contact-note">
              Verify property
              details directly
              with the owner or
              agent before making
              any decision.
            </p>
          </aside>
        </div>

        <SimilarProperties
          currentProperty={
            property
          }
          allProperties={
            allProperties
          }
          navigate={
            navigate
          }
        />
      </main>

      <Footer />
    </div>
  );
}

function SimilarProperties({
  currentProperty,
  allProperties,
  navigate,
}: {
  currentProperty:
    DisplayProperty;

  allProperties:
    DisplayProperty[];

  navigate: ReturnType<
    typeof useNavigate
  >;
}) {
  const similar =
    allProperties
      .filter(
        (property) =>
          property.id !==
            currentProperty.id &&
          property.category ===
            currentProperty.category &&
          property.mode ===
            currentProperty.mode
      )
      .slice(0, 3);

  if (
    similar.length === 0
  ) {
    return null;
  }

  return (
    <section className="similar-section">
      <div className="similar-section-heading">
        <div>
          <span className="details-label">
            YOU MAY ALSO LIKE
          </span>

          <h2>
            Similar
            Properties
          </h2>
        </div>

        <Link
          to={`/properties?mode=${currentProperty.mode}&category=${currentProperty.category}`}
        >
          View All →
        </Link>
      </div>

      <div className="similar-property-grid">
        {similar.map(
          (property) => (
            <article
              key={
                property.id
              }
              className="similar-property-card"
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

              <div>
                <span>
                  {getCategoryLabel(
                    property.category
                  )}
                </span>

                <h3>
                  {
                    property.title
                  }
                </h3>

                <p>
                  ⌖{" "}
                  {
                    property.location
                  }
                </p>

                <strong>
                  {
                    property.priceLabel
                  }
                </strong>

                <button
                  type="button"
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
          )
        )}
      </div>
    </section>
  );
}

function getOwnerProperties():
  DisplayProperty[] {
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
        ): property is DisplayProperty =>
          property !== null
      );
  } catch {
    return [];
  }
}

function convertListingToProperty(
  listing: StoredListing
):
  DisplayProperty |
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

  const details =
    buildListingDetails(
      listing
    );

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
      Number(
        listing.rawPrice
      ) ||
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

    customDescription:
      listing.description,

    ownerName:
      listing.ownerName,

    ownerType:
      listing.ownerType,

    ownerPhone:
      listing.phone,

    ownerEmail:
      listing.email,

    isUserListing:
      true,
  };
}

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
      listing.furnishing
    ) {
      details.push(
        listing.furnishing
      );
    }

    if (
      listing.parking
    ) {
      details.push(
        `Parking: ${listing.parking}`
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

function getPropertyOverview(
  property:
    DisplayProperty
): OverviewItem[] {
  const common:
    OverviewItem[] = [
    {
      label:
        "Property Type",
      value:
        formatType(
          property.type
        ),
    },

    {
      label:
        "Location",
      value:
        property.location,
    },
  ];

  if (
    property.category ===
    "residential"
  ) {
    return [
      ...common,

      {
        label:
          "Bedrooms",
        value:
          findDetail(
            property,
            "Beds"
          ) ||
          "Not Specified",
      },

      {
        label:
          "Bathrooms",
        value:
          findDetail(
            property,
            "Baths"
          ) ||
          "Not Specified",
      },

      {
        label: "Area",
        value:
          getArea(
            property
          ),
      },

      {
        label:
          "Furnishing",
        value:
          findFurnishing(
            property
          ),
      },

      {
        label:
          "Status",
        value:
          getPurpose(
            property
          ),
      },
    ];
  }

  if (
    property.category ===
    "commercial"
  ) {
    return [
      ...common,

      {
        label:
          "Built-up Area",
        value:
          `${property.area} sq.ft`,
      },

      {
        label: "Floor",
        value:
          findDetail(
            property,
            "Floor"
          ) ||
          "Not Specified",
      },

      {
        label:
          "Furnishing",
        value:
          findFurnishing(
            property
          ),
      },

      {
        label:
          "Parking",
        value:
          getParkingValue(
            property
          ),
      },

      {
        label:
          "Purpose",
        value:
          getPurpose(
            property
          ),
      },
    ];
  }

  if (
    property.category ===
    "land"
  ) {
    return [
      ...common,

      {
        label:
          "Land Area",
        value:
          getArea(
            property
          ),
      },

      {
        label:
          "Facing",
        value:
          findDetail(
            property,
            "Facing"
          ) ||
          "Not Specified",
      },

      {
        label: "Road",
        value:
          findDetail(
            property,
            "Road"
          ) ||
          "Road Access",
      },

      {
        label:
          "Purpose",
        value:
          getPurpose(
            property
          ),
      },
    ];
  }

  if (
    property.category ===
    "industrial"
  ) {
    return [
      ...common,

      {
        label: "Area",
        value:
          `${property.area} sq.ft`,
      },

      {
        label: "Power",
        value:
          findDetail(
            property,
            "HP"
          ) ||
          "Contact Owner",
      },

      {
        label:
          "Loading Facility",
        value:
          getFeatureValue(
            property,
            "Loading"
          ),
      },

      {
        label:
          "Truck Access",
        value:
          getFeatureValue(
            property,
            "Truck Access"
          ),
      },

      {
        label:
          "Purpose",
        value:
          getPurpose(
            property
          ),
      },
    ];
  }

  return [
    ...common,

    {
      label:
        "Accommodation",
      value:
        property.details.find(
          (detail) =>
            !detail.includes(
              "sq.ft"
            ) &&
            !detail
              .toLowerCase()
              .includes(
                "furnished"
              )
        ) ||
        "Available",
    },

    {
      label:
        "Facilities",
      value:
        property.details[1] ||
        "Contact Owner",
    },

    {
      label:
        "Furnishing",
      value:
        findFurnishing(
          property
        ),
    },

    {
      label: "Area",
      value:
        `${property.area} sq.ft`,
    },

    {
      label:
        "Purpose",
      value:
        getPurpose(
          property
        ),
    },
  ];
}

function getDescription(
  property:
    DisplayProperty
) {
  if (
    property.customDescription &&
    property.customDescription.trim()
  ) {
    return property
      .customDescription;
  }

  const type =
    formatType(
      property.type
    );

  const details =
    property.details.join(
      ", "
    );

  return `${property.title} is a ${type.toLowerCase()} located in ${property.location}. Property details include ${details}. The property is ${getPurpose(
    property
  ).toLowerCase()} at ${property.priceLabel}.`;
}

function getAmenities(
  property:
    DisplayProperty
) {
  const amenities:
    string[] = [];

  if (
    property.category ===
    "residential"
  ) {
    amenities.push(
      "Water Supply",
      "Electricity",
      "Road Access"
    );
  }

  if (
    property.category ===
    "commercial"
  ) {
    amenities.push(
      "Business Access",
      "Electricity",
      "Road Connectivity"
    );
  }

  if (
    property.category ===
    "land"
  ) {
    amenities.push(
      "Road Connectivity",
      "Accessible Location"
    );
  }

  if (
    property.category ===
    "industrial"
  ) {
    amenities.push(
      "Industrial Access",
      "Road Connectivity"
    );
  }

  if (
    property.category ===
    "rental"
  ) {
    amenities.push(
      "Water Supply",
      "Electricity",
      "Security"
    );
  }

  property.details.forEach(
    (detail) => {
      const value =
        detail.toLowerCase();

      if (
        value.includes(
          "parking"
        ) &&
        !value.includes(
          "not available"
        )
      ) {
        amenities.push(
          "Parking"
        );
      }

      if (
        value.includes(
          "furnished"
        )
      ) {
        amenities.push(
          "Furnished"
        );
      }

      if (
        value.includes(
          "wi-fi"
        ) ||
        value.includes(
          "wifi"
        )
      ) {
        amenities.push(
          "Wi-Fi"
        );
      }

      if (
        value.includes(
          "food"
        )
      ) {
        amenities.push(
          "Food Facility"
        );
      }

      if (
        value.includes(
          "loading"
        ) &&
        !value.includes(
          "not available"
        )
      ) {
        amenities.push(
          "Loading Facility"
        );
      }

      if (
        value.includes(
          "truck access"
        ) &&
        !value.includes(
          "not available"
        )
      ) {
        amenities.push(
          "Truck Access"
        );
      }

      if (
        value.includes(
          "hp"
        )
      ) {
        amenities.push(
          "Power Supply"
        );
      }
    }
  );

  return [
    ...new Set(
      amenities
    ),
  ];
}

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

function findDetail(
  property:
    DisplayProperty,
  value: string
) {
  return (
    property.details.find(
      (detail) =>
        detail
          .toLowerCase()
          .includes(
            value.toLowerCase()
          )
    ) || ""
  );
}

function findFurnishing(
  property:
    DisplayProperty
) {
  return (
    property.details.find(
      (detail) =>
        detail
          .toLowerCase()
          .includes(
            "furnished"
          ) ||
        detail
          .toLowerCase()
          .includes(
            "unfurnished"
          )
    ) ||
    "Contact Owner"
  );
}

function getParkingValue(
  property:
    DisplayProperty
) {
  const detail =
    findDetail(
      property,
      "Parking"
    );

  if (!detail) {
    return "Contact Owner";
  }

  if (
    detail
      .toLowerCase()
      .includes(
        "not available"
      )
  ) {
    return "Not Available";
  }

  return "Available";
}

function getFeatureValue(
  property:
    DisplayProperty,
  value: string
) {
  const detail =
    findDetail(
      property,
      value
    );

  if (!detail) {
    return "Contact Owner";
  }

  if (
    detail
      .toLowerCase()
      .includes(
        "not available"
      )
  ) {
    return "Not Available";
  }

  return "Available";
}

function getArea(
  property:
    DisplayProperty
) {
  const area =
    property.details.find(
      (detail) =>
        detail
          .toLowerCase()
          .includes(
            "sq.ft"
          ) ||
        detail
          .toLowerCase()
          .includes(
            "sq.yd"
          ) ||
        detail
          .toLowerCase()
          .includes(
            "acre"
          )
    );

  return (
    area ||
    `${property.area} sq.ft`
  );
}

function formatType(
  value: string
) {
  return value
    .replace(
      /-/g,
      " "
    )
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

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

function normalizeCategory(
  value?: string
):
  Property["category"] |
  null {
  switch (value) {
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

function getCategoryLabel(
  category:
    Property["category"]
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
      return category;
  }
}

function getPurpose(
  property:
    DisplayProperty
) {
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
}

function extractPriceNumber(
  value: string
) {
  const numeric =
    value.replace(
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

function formatDate(
  date: string
) {
  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "Recently";
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

export default PropertyDetails;