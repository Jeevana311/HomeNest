import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  properties,
  type Property,
} from "../data/properties";

import "./Home.css";

type CategoryCard = {
  title: string;
  description: string;
  image: string;
  category: string;
};

type Project = {
  id: number;
  title: string;
  location: string;
  status: string;
  price: string;
  image: string;
};

function Home() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const featuredProperties = properties;

  const categories: CategoryCard[] = [
    {
      title: "Residential",
      description: "Apartments · Houses · Villas",
      category: "residential",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Commercial",
      description: "Offices · Shops · Showrooms",
      category: "commercial",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Plots & Land",
      description: "Residential · Commercial · Agricultural",
      category: "land",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Industrial",
      description: "Warehouses · Factories · Industrial Sheds",
      category: "industrial",
      image:
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Rental & PG",
      description: "Rental Homes · PG · Co-living",
      category: "rental",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "New Projects",
      description: "New Launches · Under Construction · Ready to Move",
      category: "new-projects",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=90",
    },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Green Valley Residency",
      location: "Guntur",
      status: "New Launch",
      price: "Starting from ₹55 Lakhs",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=90",
    },
    {
      id: 2,
      title: "Riverfront Heights",
      location: "Vijayawada",
      status: "Under Construction",
      price: "Starting from ₹72 Lakhs",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=90",
    },
    {
      id: 3,
      title: "Golden Meadows",
      location: "Tenali",
      status: "Ready to Move",
      price: "Starting from ₹48 Lakhs",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=90",
    },
  ];

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as number[];

    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((currentFavorites) => {
      const updatedFavorites = currentFavorites.includes(id)
        ? currentFavorites.filter((propertyId) => propertyId !== id)
        : [...currentFavorites, id];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("mode", mode);

    if (location) {
      params.set("location", location);
    }

    if (propertyType) {
      params.set("type", propertyType);
    }

    if (priceRange) {
      params.set("price", priceRange);
    }

    navigate(`/properties?${params.toString()}`);
  };

  const openProperty = (id: number) => {
    navigate(`/properties/${id}`);
  };

  const getCategoryLabel = (property: Property) => {
    switch (property.category) {
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

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            YOUR REAL ESTATE MARKETPLACE
          </span>

          <h1>
            Find the right property
            <br />
            <span>for your future.</span>
          </h1>

          <p>
            Discover residential, commercial, land, rental and investment
            opportunities across Guntur, Vijayawada and Tenali.
          </p>

          <div className="buy-rent-buttons">
            <button
              type="button"
              className={mode === "buy" ? "active-btn" : ""}
              onClick={() => {
                setMode("buy");
                setPriceRange("");
              }}
            >
              Buy
            </button>

            <button
              type="button"
              className={mode === "rent" ? "active-btn" : ""}
              onClick={() => {
                setMode("rent");
                setPriceRange("");
              }}
            >
              Rent
            </button>
          </div>
        </div>
      </section>

      <section className="search-section">
        <div className="search-field">
          <label htmlFor="location">
            Location
          </label>

          <select
            id="location"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          >
            <option value="">
              Select Location
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

        <div className="search-field">
          <label htmlFor="propertyType">
            Property Type
          </label>

          <select
            id="propertyType"
            value={propertyType}
            onChange={(event) =>
              setPropertyType(event.target.value)
            }
          >
            <option value="">
              All Property Types
            </option>

            <optgroup label="Residential">
              <option value="apartment">
                Apartment
              </option>

              <option value="independent-house">
                Independent House
              </option>

              <option value="villa">
                Villa
              </option>

              <option value="penthouse">
                Penthouse
              </option>

              <option value="studio-apartment">
                Studio Apartment
              </option>

              <option value="independent-floor">
                Independent Floor
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
                Commercial Building
              </option>

              <option value="coworking-space">
                Co-working Space
              </option>
            </optgroup>

            <optgroup label="Plots & Land">
              <option value="residential-plot">
                Residential Plot
              </option>

              <option value="commercial-plot">
                Commercial Plot
              </option>

              <option value="agricultural-land">
                Agricultural Land
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
                Industrial Shed
              </option>
            </optgroup>

            <optgroup label="Rental / Other">
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
        </div>

        <div className="search-field">
          <label htmlFor="priceRange">
            {mode === "buy" ? "Budget" : "Monthly Rent"}
          </label>

          <select
            id="priceRange"
            value={priceRange}
            onChange={(event) =>
              setPriceRange(event.target.value)
            }
          >
            <option value="">
              {mode === "buy"
                ? "Select Budget"
                : "Select Monthly Rent"}
            </option>

            {mode === "buy" ? (
              <>
                <option value="0-20">
                  Below ₹20L
                </option>

                <option value="20-50">
                  ₹20L - ₹50L
                </option>

                <option value="50-100">
                  ₹50L - ₹1Cr
                </option>

                <option value="100-0">
                  ₹1Cr+
                </option>
              </>
            ) : (
              <>
                <option value="0-10">
                  Below ₹10,000
                </option>

                <option value="10-25">
                  ₹10,000 - ₹25,000
                </option>

                <option value="25-50">
                  ₹25,000 - ₹50,000
                </option>

                <option value="50-0">
                  ₹50,000+
                </option>
              </>
            )}
          </select>
        </div>

        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
        >
          Search Properties
        </button>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              FIND YOUR PERFECT PROPERTY
            </span>

            <h2>
              Explore Properties
            </h2>

            <p>
              Explore residential, commercial, land, industrial and rental
              opportunities.
            </p>
          </div>

          <Link to="/properties">
            View All →
          </Link>
        </div>

        <div className="property-grid">
          {featuredProperties.map((property) => {
            const isFavorite =
              favorites.includes(property.id);

            return (
              <article
                key={property.id}
                className="property-card"
                onClick={() =>
                  openProperty(property.id)
                }
              >
                <div className="property-image-wrapper">
                  <img
                    className="property-image"
                    src={property.image}
                    alt={property.title}
                  />

                  <span className="property-badge">
                    {property.badge}
                  </span>

                  <button
                    type="button"
                    className={`favorite-button ${
                      isFavorite
                        ? "favorite-active"
                        : ""
                    }`}
                    aria-label={
                      isFavorite
                        ? "Remove property from favorites"
                        : "Add property to favorites"
                    }
                    onClick={(event) => {
                      event.stopPropagation();

                      toggleFavorite(property.id);
                    }}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                </div>

                <div className="property-content">
                  <div className="property-top">
                    <span className="property-category">
                      {getCategoryLabel(property)}
                    </span>

                    <h3>
                      {property.title}
                    </h3>

                    <p className="price">
                      {property.priceLabel}
                    </p>
                  </div>

                  <p className="property-details">
                    {property.details.join(" · ")}
                  </p>

                  <p className="property-location">
                    ⌖ {property.location}
                  </p>

                  <button
                    type="button"
                    className="view-property-button"
                    onClick={(event) => {
                      event.stopPropagation();

                      openProperty(property.id);
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="category-section">
        <div className="section category-inner">
          <div className="center-heading">
            <span className="section-label">
              EXPLORE REAL ESTATE
            </span>

            <h2>
              Browse by Category
            </h2>

            <p>
              Explore residential, commercial, land, industrial, rental
              properties and new projects.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.category}
                type="button"
                className="category-card"
                onClick={() => {
                  if (
                    category.category ===
                    "new-projects"
                  ) {
                    navigate("/new-projects");
                    return;
                  }

                  navigate(
                    `/properties?category=${category.category}`
                  );
                }}
              >
                <div className="category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="category-image"
                  />
                </div>

                <div className="category-content">
                  <h3>
                    {category.title}
                  </h3>

                  <p>
                    {category.description}
                  </p>

                  <span>
                    Explore {category.title} →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="why-content">
          <div className="why-heading">
            <span>
              WHY HOMENEST
            </span>

            <h2>
              Everything you need for
              <br />
              your property journey.
            </h2>

            <p>
              Discover different types of real estate, connect with owners
              and agents, shortlist properties and schedule visits through
              one simple platform.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <span className="why-icon">
                ⌂
              </span>

              <h3>
                Wide Property Choice
              </h3>

              <p>
                Explore residential, commercial, land, industrial and rental
                properties.
              </p>
            </div>

            <div className="why-card">
              <span className="why-icon">
                ✓
              </span>

              <h3>
                Trusted Listings
              </h3>

              <p>
                Discover clear property information from owners and
                real-estate professionals.
              </p>
            </div>

            <div className="why-card">
              <span className="why-icon">
                ◇
              </span>

              <h3>
                Easy Property Search
              </h3>

              <p>
                Search and filter properties based on your location, type and
                budget.
              </p>
            </div>

            <div className="why-card">
              <span className="why-icon">
                ◎
              </span>

              <h3>
                Enquire & Visit
              </h3>

              <p>
                Shortlist properties, send enquiries and schedule property
                visits easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section locations-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              EXPLORE LOCATIONS
            </span>

            <h2>
              Popular Locations
            </h2>

            <p>
              Discover properties across our current HomeNest locations.
            </p>
          </div>
        </div>

        <div className="location-grid">
          <button
            className="location-card guntur"
            type="button"
            onClick={() =>
              navigate(
                "/properties?location=Guntur"
              )
            }
          >
            <div>
              <span>
                Explore properties in
              </span>

              <h3>
                Guntur
              </h3>

              <p>
                View Listings →
              </p>
            </div>
          </button>

          <button
            className="location-card vijayawada"
            type="button"
            onClick={() =>
              navigate(
                "/properties?location=Vijayawada"
              )
            }
          >
            <div>
              <span>
                Explore properties in
              </span>

              <h3>
                Vijayawada
              </h3>

              <p>
                View Listings →
              </p>
            </div>
          </button>

          <button
            className="location-card tenali"
            type="button"
            onClick={() =>
              navigate(
                "/properties?location=Tenali"
              )
            }
          >
            <div>
              <span>
                Explore properties in
              </span>

              <h3>
                Tenali
              </h3>

              <p>
                View Listings →
              </p>
            </div>
          </button>
        </div>
      </section>

      <section className="section projects-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              DISCOVER WHAT'S NEW
            </span>

            <h2>
              New Projects
            </h2>

            <p>
              Explore new launches, under-construction developments and
              ready-to-move projects.
            </p>
          </div>

          <Link to="/new-projects">
            View All Projects →
          </Link>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              onClick={() =>
                navigate(
                  `/new-projects/${project.id}`
                )
              }
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />

                <span className="project-status">
                  {project.status}
                </span>
              </div>

              <div className="project-content">
                <h3>
                  {project.title}
                </h3>

                <p className="project-location">
                  ⌖ {project.location}
                </p>

                <p className="project-price">
                  {project.price}
                </p>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    navigate(
                      `/new-projects/${project.id}`
                    );
                  }}
                >
                  View Project →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sell-section">
        <div className="sell-content">
          <span>
            FOR PROPERTY OWNERS
          </span>

          <h2>
            Want to list your property?
          </h2>

          <p>
            Reach potential buyers and tenants by listing your residential,
            commercial, land or industrial property on HomeNest.
          </p>

          <div className="owner-buttons">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/list-property?purpose=sell"
                )
              }
            >
              Sell Property →
            </button>

            <button
              type="button"
              className="rent-out-button"
              onClick={() =>
                navigate(
                  "/list-property?purpose=rent"
                )
              }
            >
              Rent Out Property →
            </button>
          </div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="center-heading">
          <span className="section-label">
            CLIENT STORIES
          </span>

          <h2>
            What Our Users Say
          </h2>

          <p>
            Experiences from property seekers and owners using HomeNest.
          </p>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial">
            <p className="stars">
              ★★★★★
            </p>

            <p className="review">
              “HomeNest made comparing different properties much easier.
              I could quickly shortlist properties that matched my budget
              and requirements.”
            </p>

            <div className="client">
              <img
                className="client-image"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=90"
                alt="Anjali Sharma"
              />

              <div className="client-info">
                <strong>
                  Anjali Sharma
                </strong>

                <span>
                  Property Buyer
                </span>
              </div>
            </div>
          </div>

          <div className="testimonial">
            <p className="stars">
              ★★★★★
            </p>

            <p className="review">
              “The search and property details were simple to understand.
              I found several suitable rental options in Vijayawada.”
            </p>

            <div className="client">
              <img
                className="client-image"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=90"
                alt="Rahul Verma"
              />

              <div className="client-info">
                <strong>
                  Rahul Verma
                </strong>

                <span>
                  Tenant
                </span>
              </div>
            </div>
          </div>

          <div className="testimonial">
            <p className="stars">
              ★★★★★
            </p>

            <p className="review">
              “Listing my property was straightforward and helped me connect
              with interested property seekers without unnecessary
              complications.”
            </p>

            <div className="client">
              <img
                className="client-image"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=90"
                alt="Priya Reddy"
              />

              <div className="client-info">
                <strong>
                  Priya Reddy
                </strong>

                <span>
                  Property Owner
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;