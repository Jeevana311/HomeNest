import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./NewProjectDetails.css";

type ProjectStatus =
  | "new-launch"
  | "under-construction"
  | "ready-to-move";

type ProjectDetails = {
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
  description: string;
  area: string;
  totalUnits: string;
  projectSize: string;
  reraStatus: string;
  amenities: string[];
  highlights: string[];
};

const projects: ProjectDetails[] = [
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
    area: "1100 - 1650 sq.ft",
    totalUnits: "180 Units",
    projectSize: "4.5 Acres",
    reraStatus: "Applied",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=88",
    description:
      "Green Valley Heights is a modern residential development designed for comfortable urban living with thoughtfully planned apartments, open spaces and convenient access to important parts of Guntur.",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Children's Play Area",
      "24/7 Security",
      "Power Backup",
      "Clubhouse",
      "Landscaped Garden",
      "Covered Parking",
    ],
    highlights: [
      "Prime residential location in Guntur",
      "Spacious 2 & 3 BHK apartments",
      "Modern community amenities",
      "Good road connectivity",
    ],
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
    area: "1250 - 2400 sq.ft",
    totalUnits: "260 Units",
    projectSize: "6 Acres",
    reraStatus: "Registered",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=88",
    description:
      "Riverfront Residences offers premium apartments in Vijayawada with contemporary architecture, spacious interiors and modern lifestyle facilities.",
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Indoor Games",
      "Jogging Track",
      "24/7 Security",
      "CCTV",
      "Visitor Parking",
      "Community Hall",
    ],
    highlights: [
      "Premium apartments in Vijayawada",
      "Multiple configurations available",
      "Modern recreational facilities",
      "Planned gated community",
    ],
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
    area: "1050 - 1500 sq.ft",
    totalUnits: "120 Units",
    projectSize: "3 Acres",
    reraStatus: "Registered",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=88",
    description:
      "Tenali Elite Homes is a ready-to-move residential community offering comfortable apartments with practical layouts and essential amenities.",
    amenities: [
      "Children's Play Area",
      "Security",
      "Power Backup",
      "Lift",
      "Parking",
      "Garden",
      "Community Hall",
      "Water Supply",
    ],
    highlights: [
      "Ready for immediate possession",
      "Well-planned apartments",
      "Convenient Tenali location",
      "Essential community facilities",
    ],
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
    area: "1650 - 1950 sq.ft",
    totalUnits: "150 Units",
    projectSize: "4 Acres",
    reraStatus: "Registered",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=88",
    description:
      "Lakeview Towers is a premium residential project featuring spacious 3 BHK apartments designed for families looking for modern comfort in Guntur.",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Clubhouse",
      "Landscaped Garden",
      "Security",
      "Power Backup",
      "Multipurpose Hall",
      "Covered Parking",
    ],
    highlights: [
      "Premium 3 BHK homes",
      "Spacious floor plans",
      "Lifestyle amenities",
      "Well-connected location",
    ],
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
    area: "1800 - 2800 sq.ft",
    totalUnits: "220 Units",
    projectSize: "7 Acres",
    reraStatus: "Applied",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=88",
    description:
      "Skyline Grande is a luxury residential development planned with spacious residences, premium amenities and contemporary architecture.",
    amenities: [
      "Infinity Pool",
      "Premium Gym",
      "Clubhouse",
      "Indoor Games",
      "Jogging Track",
      "Security",
      "EV Charging",
      "Visitor Parking",
    ],
    highlights: [
      "Luxury 3 & 4 BHK apartments",
      "Large gated community",
      "Premium lifestyle features",
      "Located in Vijayawada",
    ],
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
    area: "2200 - 2600 sq.ft",
    totalUnits: "48 Villas",
    projectSize: "5 Acres",
    reraStatus: "Registered",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=88",
    description:
      "Serene Villas is a premium villa community in Tenali offering spacious homes, private surroundings and comfortable family living.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Private Garden",
      "Security",
      "Children's Play Area",
      "Walking Track",
      "Visitor Parking",
    ],
    highlights: [
      "Ready-to-move villas",
      "Spacious 3 BHK layouts",
      "Low-density development",
      "Premium residential environment",
    ],
  },
];

function NewProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    return (
      <div className="new-project-details-page">
        <Navbar />

        <main className="project-details-not-found">
          <span>⌂</span>

          <h1>Project Not Found</h1>

          <p>
            The project you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/new-projects")}
          >
            Back to New Projects
          </button>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="new-project-details-page">
      <Navbar />

      <main className="new-project-details-main">
        <div className="project-details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/new-projects">New Projects</Link>
          <span>/</span>
          <span>{project.name}</span>
        </div>

        <section className="project-details-header">
          <div>
            <span className="project-details-eyebrow">
              {project.builder}
            </span>

            <h1>{project.name}</h1>

            <p>
              ⌖ {project.location}, Andhra Pradesh
            </p>
          </div>

          <div className="project-details-header-right">
            <span
              className={`project-details-status ${project.status}`}
            >
              {project.statusLabel}
            </span>

            <strong>{project.price}</strong>
          </div>
        </section>

        <section className="project-details-image">
          <img
            src={project.image}
            alt={project.name}
          />
        </section>

        <section className="project-details-summary">
          <div>
            <span>Configuration</span>
            <strong>{project.configuration}</strong>
          </div>

          <div>
            <span>Area</span>
            <strong>{project.area}</strong>
          </div>

          <div>
            <span>Possession</span>
            <strong>{project.possession}</strong>
          </div>

          <div>
            <span>Total Units</span>
            <strong>{project.totalUnits}</strong>
          </div>
        </section>

        <div className="project-details-layout">
          <div>
            <section className="project-details-box">
              <span className="project-details-section-label">
                PROJECT OVERVIEW
              </span>

              <h2>About {project.name}</h2>

              <p className="project-description">
                {project.description}
              </p>
            </section>

            <section className="project-details-box">
              <span className="project-details-section-label">
                PROJECT INFORMATION
              </span>

              <h2>Project Details</h2>

              <div className="project-info-grid">
                <div>
                  <span>Builder</span>
                  <strong>{project.builder}</strong>
                </div>

                <div>
                  <span>Project Size</span>
                  <strong>{project.projectSize}</strong>
                </div>

                <div>
                  <span>Configuration</span>
                  <strong>{project.configuration}</strong>
                </div>

                <div>
                  <span>RERA Status</span>
                  <strong>{project.reraStatus}</strong>
                </div>

                <div>
                  <span>Possession</span>
                  <strong>{project.possession}</strong>
                </div>

                <div>
                  <span>Starting Price</span>
                  <strong>{project.price}</strong>
                </div>
              </div>
            </section>

            <section className="project-details-box">
              <span className="project-details-section-label">
                AMENITIES
              </span>

              <h2>Project Amenities</h2>

              <div className="project-amenities-grid">
                {project.amenities.map((amenity) => (
                  <div key={amenity}>
                    <span>✓</span>
                    <strong>{amenity}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="project-details-box">
              <span className="project-details-section-label">
                HIGHLIGHTS
              </span>

              <h2>Why Consider This Project?</h2>

              <div className="project-highlights">
                {project.highlights.map((highlight) => (
                  <div key={highlight}>
                    <span>✓</span>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="project-details-box">
              <span className="project-details-section-label">
                LOCATION
              </span>

              <h2>Project Location</h2>

              <div className="new-project-location-card">
                <span>⌖</span>

                <div>
                  <strong>
                    {project.location}, Andhra Pradesh
                  </strong>

                  <p>
                    Exact map integration can be connected later
                    using Google Maps or another map service.
                  </p>
                </div>
              </div>

              <div className="project-map-placeholder">
                <span>⌖</span>
                <strong>{project.location}</strong>
                <p>Map preview will appear here</p>
              </div>
            </section>
          </div>

          <aside className="project-enquiry-card">
            <span className="project-details-section-label">
              INTERESTED IN THIS PROJECT?
            </span>

            <h2>Request Project Details</h2>

            <p>
              Connect with the builder or project representative
              for pricing, availability and visit scheduling.
            </p>

            <div className="project-enquiry-info">
              <span>Project</span>
              <strong>{project.name}</strong>
            </div>

            <div className="project-enquiry-info">
              <span>Builder</span>
              <strong>{project.builder}</strong>
            </div>

            <div className="project-enquiry-info">
              <span>Location</span>
              <strong>{project.location}</strong>
            </div>

            <div className="project-enquiry-info">
              <span>Starting Price</span>
              <strong>{project.price}</strong>
            </div>

            <button
              type="button"
              className="project-enquire-button"
              onClick={() =>
                alert(
                  `Enquiry submitted for ${project.name}. Backend integration will be added later.`
                )
              }
            >
              Enquire Now
            </button>

            <button
              type="button"
              className="project-visit-button"
              onClick={() =>
                alert(
                  `Visit request started for ${project.name}.`
                )
              }
            >
              Schedule Visit
            </button>

            <small>
              HomeNest does not process property payments or
              legal registration.
            </small>
          </aside>
        </div>

        <section className="back-projects-section">
          <button
            type="button"
            onClick={() => navigate("/new-projects")}
          >
            ← Back to All New Projects
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewProjectDetails;