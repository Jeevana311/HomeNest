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
  getCurrentUser,
} from "../utils/authStorage";

import "./MyListings.css";

type ListingStatus =
  | "active"
  | "inactive";

type MyListing = {
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
    ListingStatus;

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

function MyListings() {
  const navigate =
    useNavigate();

  const currentUser =
    getCurrentUser();

  const [
    listings,
    setListings,
  ] =
    useState<MyListing[]>([]);

  const [
    filter,
    setFilter,
  ] =
    useState<
      "all" | ListingStatus
    >("all");

  const getAllListings =
    (): MyListing[] => {
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
        ) as MyListing[];
      } catch {
        return [];
      }
    };

  const saveAllListings = (
    allListings:
      MyListing[]
  ) => {
    localStorage.setItem(
      "homeNestListings",
      JSON.stringify(
        allListings
      )
    );
  };

  const isOwnedByCurrentUser = (
    listing: MyListing
  ) => {
    if (!currentUser) {
      return false;
    }

    if (
      listing.ownerUserId !==
      undefined
    ) {
      return (
        listing.ownerUserId ===
        currentUser.id
      );
    }

    if (
      listing.email &&
      currentUser.email
    ) {
      return (
        listing.email
          .trim()
          .toLowerCase() ===
        currentUser.email
          .trim()
          .toLowerCase()
      );
    }

    return false;
  };

  const loadMyListings =
    () => {
      if (!currentUser) {
        setListings([]);
        return;
      }

      const allListings =
        getAllListings();

      let changed = false;

      const migratedListings =
        allListings.map(
          (listing) => {
            if (
              listing.ownerUserId ===
                undefined &&
              listing.email &&
              currentUser.email &&
              listing.email
                .trim()
                .toLowerCase() ===
                currentUser.email
                  .trim()
                  .toLowerCase()
            ) {
              changed = true;

              return {
                ...listing,
                ownerUserId:
                  currentUser.id,
              };
            }

            return listing;
          }
        );

      if (changed) {
        saveAllListings(
          migratedListings
        );
      }

      setListings(
        migratedListings.filter(
          (listing) =>
            listing.ownerUserId ===
            currentUser.id
        )
      );
    };

  useEffect(() => {
    loadMyListings();
  }, []);

  const filteredListings =
    filter === "all"
      ? listings
      : listings.filter(
          (listing) =>
            listing.status ===
            filter
        );

  const activeCount =
    listings.filter(
      (listing) =>
        listing.status ===
        "active"
    ).length;

  const inactiveCount =
    listings.filter(
      (listing) =>
        listing.status ===
        "inactive"
    ).length;

  const totalEnquiries =
    listings.reduce(
      (
        total,
        listing
      ) =>
        total +
        (listing.enquiries || 0),
      0
    );

  const toggleStatus = (
    id: number
  ) => {
    const allListings =
      getAllListings();

    const target =
      allListings.find(
        (listing) =>
          listing.id === id
      );

    if (
      !target ||
      !isOwnedByCurrentUser(
        target
      )
    ) {
      window.alert(
        "You can only change the status of your own listings."
      );

      return;
    }

    const updatedAllListings =
      allListings.map(
        (listing) => {
          if (
            listing.id !== id
          ) {
            return listing;
          }

          const newStatus:
            ListingStatus =
            listing.status ===
            "active"
              ? "inactive"
              : "active";

          return {
            ...listing,
            ownerUserId:
              currentUser?.id ??
              listing.ownerUserId,
            status:
              newStatus,
          };
        }
      );

    saveAllListings(
      updatedAllListings
    );

    setListings(
      updatedAllListings.filter(
        (listing) =>
          currentUser &&
          listing.ownerUserId ===
            currentUser.id
      )
    );
  };

  const deleteListing = (
    id: number
  ) => {
    const allListings =
      getAllListings();

    const target =
      allListings.find(
        (listing) =>
          listing.id === id
      );

    if (
      !target ||
      !isOwnedByCurrentUser(
        target
      )
    ) {
      window.alert(
        "You can only delete your own listings."
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this listing?"
      );

    if (!confirmed) {
      return;
    }

    const updatedAllListings =
      allListings.filter(
        (listing) =>
          listing.id !== id
      );

    saveAllListings(
      updatedAllListings
    );

    setListings(
      updatedAllListings.filter(
        (listing) =>
          currentUser &&
          listing.ownerUserId ===
            currentUser.id
      )
    );
  };

  const viewListing = (
    listing: MyListing
  ) => {
    navigate(
      `/properties/${listing.id}`
    );
  };

  const editListing = (
    listing: MyListing
  ) => {
    if (
      !isOwnedByCurrentUser(
        listing
      )
    ) {
      window.alert(
        "You can only edit your own listings."
      );

      return;
    }

    navigate(
      `/edit-property/${listing.id}`
    );
  };

  return (
    <div className="my-listings-page">
      <Navbar />

      <main className="my-listings-main">
        <section className="my-listings-header">
          <div>
            <span className="my-listings-eyebrow">
              OWNER DASHBOARD
            </span>

            <h1>
              My Listings
            </h1>

            <p>
              View and manage the
              properties you have
              listed on HomeNest.
            </p>
          </div>

          <button
            type="button"
            className="add-listing-button"
            onClick={() =>
              navigate(
                "/list-property"
              )
            }
          >
            + Add New Property
          </button>
        </section>

        <section className="listing-stats">
          <article>
            <span>
              Total Listings
            </span>

            <strong>
              {
                listings.length
              }
            </strong>
          </article>

          <article>
            <span>
              Active
            </span>

            <strong>
              {
                activeCount
              }
            </strong>
          </article>

          <article>
            <span>
              Inactive
            </span>

            <strong>
              {
                inactiveCount
              }
            </strong>
          </article>

          <article>
            <span>
              Total Enquiries
            </span>

            <strong>
              {
                totalEnquiries
              }
            </strong>
          </article>
        </section>

        <section className="my-listings-content">
          <div className="listings-toolbar">
            <div>
              <h2>
                Your Properties
              </h2>

              <p>
                {
                  filteredListings.length
                }{" "}
                {
                  filteredListings.length ===
                  1
                    ? "listing"
                    : "listings"
                }
              </p>
            </div>

            <div className="listing-filter-buttons">
              <button
                type="button"
                className={
                  filter ===
                  "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "all"
                  )
                }
              >
                All
              </button>

              <button
                type="button"
                className={
                  filter ===
                  "active"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "active"
                  )
                }
              >
                Active
              </button>

              <button
                type="button"
                className={
                  filter ===
                  "inactive"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "inactive"
                  )
                }
              >
                Inactive
              </button>
            </div>
          </div>

          {filteredListings.length >
          0 ? (
            <div className="my-listings-grid">
              {filteredListings.map(
                (listing) => (
                  <article
                    key={
                      listing.id
                    }
                    className="my-listing-card"
                  >
                    <div className="my-listing-image">
                      <img
                        src={
                          listing.image
                        }
                        alt={
                          listing.title
                        }
                      />

                      <span
                        className={`listing-status ${listing.status}`}
                      >
                        {
                          listing.status ===
                          "active"
                            ? "Active"
                            : "Inactive"
                        }
                      </span>
                    </div>

                    <div className="my-listing-details">
                      <div className="listing-tags">
                        <span>
                          {
                            listing.purpose
                          }
                        </span>

                        <span>
                          {
                            listing.type
                          }
                        </span>
                      </div>

                      <h3>
                        {
                          listing.title
                        }
                      </h3>

                      <p className="my-listing-location">
                        ⌖{" "}
                        {
                          listing.location
                        }
                        , Andhra Pradesh
                      </p>

                      <strong className="my-listing-price">
                        {
                          listing.price
                        }
                      </strong>

                      <div className="listing-enquiries">
                        <span>
                          Enquiries
                        </span>

                        <strong>
                          {
                            listing.enquiries ||
                            0
                          }
                        </strong>
                      </div>

                      <div className="listing-actions">
                        <button
                          type="button"
                          onClick={() =>
                            viewListing(
                              listing
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editListing(
                              listing
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(
                              listing.id
                            )
                          }
                        >
                          {
                            listing.status ===
                            "active"
                              ? "Deactivate"
                              : "Activate"
                          }
                        </button>

                        <button
                          type="button"
                          className="delete-listing-button"
                          onClick={() =>
                            deleteListing(
                              listing.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="no-listings">
              <span>
                ⌂
              </span>

              <h2>
                No Listings Found
              </h2>

              <p>
                You currently don't
                have any properties
                matching this filter.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/list-property"
                  )
                }
              >
                List a Property
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MyListings;
