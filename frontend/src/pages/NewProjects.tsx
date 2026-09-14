import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./NewProjects.css";

type ProjectStatus =
  | "new-launch"
  | "under-construction"
  | "ready-to-move";

type Project = {
  id: number;
  name: string;
  location: string;
  builder: string;
  status: ProjectStatus;
  statusLabel: string;
  price: string;
  configuration: string;
  possession: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Green Valley Heights",
    location: "Guntur",
    builder: "Sri Infra Developers",
    status: "new-launch",
    statusLabel: "New Launch",
    price: "₹52 Lakhs onwards",
    configuration: "2 & 3 BHK Apartments",
    possession: "December 2028",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 2,
    name: "Riverfront Residences",
    location: "Vijayawada",
    builder: "Prime Estates",
    status: "under-construction",
    statusLabel: "Under Construction",
    price: "₹68 Lakhs onwards",
    configuration: "2, 3 & 4 BHK Apartments",
    possession: "June 2027",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 3,
    name: "Tenali Elite Homes",
    location: "Tenali",
    builder: "Elite Constructions",
    status: "ready-to-move",
    statusLabel: "Ready to Move",
    price: "₹45 Lakhs onwards",
    configuration: "2 & 3 BHK Apartments",
    possession: "Ready Now",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 4,
    name: "Lakeview Towers",
    location: "Guntur",
    builder: "UrbanNest Builders",
    status: "under-construction",
    statusLabel: "Under Construction",
    price: "₹74 Lakhs onwards",
    configuration: "3 BHK Premium Apartments",
    possession: "March 2028",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 5,
    name: "Skyline Grande",
    location: "Vijayawada",
    builder: "Skyline Developers",
    status: "new-launch",
    statusLabel: "New Launch",
    price: "₹82 Lakhs onwards",
    configuration: "3 & 4 BHK Apartments",
    possession: "September 2029",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 6,
    name: "Serene Villas",
    location: "Tenali",
    builder: "Serene Infra",
    status: "ready-to-move",
    statusLabel: "Ready to Move",
    price: "₹1.10 Crore onwards",
    configuration: "3 BHK Villas",
    possession: "Ready Now",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=88",
  },
];

type FilterStatus = "all" | ProjectStatus;

function NewProjects() {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] =
    useState<FilterStatus>("all");

  const [selectedLocation, setSelectedLocation] =
    useState("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus =
        selectedStatus === "all" ||
        project.status === selectedStatus;

      const matchesLocation =
        selectedLocation === "all" ||
        project.location === selectedLocation;

      return matchesStatus && matchesLocation;
    });
  }, [selectedStatus, selectedLocation]);

  const resetFilters = () => {
    setSelectedStatus("all");
    setSelectedLocation("all");
  };

  const openProjectDetails = (projectId: number) => {
    navigate(`/new-projects/${projectId}`);
  };

  return (
    <div className="new-projects-page">
      <Navbar />

      <main className="new-projects-main">
        <section className="new-projects-hero">
          <div className="new-projects-hero-content">
            <span className="new-projects-eyebrow">
              NEW DEVELOPMENTS
            </span>

            <h1>Explore New Projects</h1>

            <p>
              Discover new launches, under-construction developments and
              ready-to-move projects across Guntur, Vijayawada and Tenali.
            </p>
          </div>
        </section>

        <section className="new-projects-content">
          <div className="new-projects-heading">
            <div>
              <span className="new-projects-eyebrow">
                FIND YOUR NEXT HOME
              </span>

              <h2>Featured New Projects</h2>

              <p>
                Compare upcoming and completed residential projects from
                different locations.
              </p>
            </div>

            <span className="project-count">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "Project"
                : "Projects"}
            </span>
          </div>

          <div className="new-projects-filter">
            <div className="project-status-tabs">
              <button
                type="button"
                className={
                  selectedStatus === "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedStatus("all")
                }
              >
                All Projects
              </button>

              <button
                type="button"
                className={
                  selectedStatus === "new-launch"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedStatus("new-launch")
                }
              >
                New Launches
              </button>

              <button
                type="button"
                className={
                  selectedStatus ===
                  "under-construction"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedStatus(
                    "under-construction"
                  )
                }
              >
                Under Construction
              </button>

              <button
                type="button"
                className={
                  selectedStatus === "ready-to-move"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedStatus(
                    "ready-to-move"
                  )
                }
              >
                Ready to Move
              </button>
            </div>

            <div className="project-location-filter">
              <label htmlFor="projectLocation">
                Location
              </label>

              <select
                id="projectLocation"
                value={selectedLocation}
                onChange={(event) =>
                  setSelectedLocation(
                    event.target.value
                  )
                }
              >
                <option value="all">
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
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="new-projects-grid">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="new-project-card"
                >
                  <div className="new-project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.name}
                    />

                    <span
                      className={`new-project-status ${project.status}`}
                    >
                      {project.statusLabel}
                    </span>
                  </div>

                  <div className="new-project-card-content">
                    <span className="new-project-builder">
                      {project.builder}
                    </span>

                    <h3>{project.name}</h3>

                    <p className="new-project-location">
                      ⌖ {project.location}, Andhra Pradesh
                    </p>

                    <strong className="new-project-price">
                      {project.price}
                    </strong>

                    <div className="new-project-info">
                      <div>
                        <span>Configuration</span>

                        <strong>
                          {project.configuration}
                        </strong>
                      </div>

                      <div>
                        <span>Possession</span>

                        <strong>
                          {project.possession}
                        </strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openProjectDetails(project.id)
                      }
                    >
                      View Project
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-new-projects">
              <span>⌂</span>

              <h2>No Projects Found</h2>

              <p>
                No projects match the selected filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <section className="project-owner-cta">
          <div>
            <span className="new-projects-eyebrow">
              FOR BUILDERS & DEVELOPERS
            </span>

            <h2>
              Want to showcase your new project?
            </h2>

            <p>
              Add your development to HomeNest and connect with buyers
              searching for newly launched properties.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/list-property")
              }
            >
              List Your Project
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewProjects;