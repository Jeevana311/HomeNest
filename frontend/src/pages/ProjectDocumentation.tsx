import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProjectDocumentation.css";

type Section = {
  id: string;
  label: string;
  number: string;
};

const sections: Section[] = [
  { id: "overview", label: "Project Overview", number: "01" },
  { id: "problem", label: "Problem & Solution", number: "02" },
  { id: "users", label: "Target Users", number: "03" },
  { id: "requirements", label: "Requirements", number: "04" },
  { id: "journey", label: "User Journey", number: "05" },
  { id: "pages", label: "Page Purpose", number: "06" },
  { id: "uiux", label: "UI / UX Design", number: "07" },
  { id: "tech", label: "Technology Stack", number: "08" },
  { id: "architecture", label: "Architecture", number: "09" },
  { id: "database", label: "Database Design", number: "10" },
  { id: "security", label: "Security", number: "11" },
  { id: "flow", label: "Application Flow", number: "12" },
  { id: "testing", label: "Testing", number: "13" },
  { id: "challenges", label: "Challenges", number: "14" },
  { id: "limitations", label: "Limitations", number: "15" },
  { id: "future", label: "Future Scope", number: "16" },
  { id: "conclusion", label: "Conclusion", number: "17" },
];

function ProjectDocumentation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setMenuOpen(false);
  };

  return (
    <div className="docs-page">
      <Navbar />

      <section className="docs-hero">
        <div className="docs-container">
          <span className="docs-eyebrow">
            FULL STACK PROJECT
          </span>

          <h1>
            HomeNest Project
            <span> Documentation</span>
          </h1>

          <p>
            Complete technical and functional documentation
            of the HomeNest real-estate marketplace,
            including requirements, user journeys, UI/UX,
            architecture, database design, security and
            application flow.
          </p>

          <div className="docs-hero-tags">
            <span>React + TypeScript</span>
            <span>Spring Boot</span>
            <span>PostgreSQL</span>
            <span>Responsive Web Application</span>
          </div>
        </div>
      </section>

      <div className="docs-mobile-nav">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Documentation Sections
          <span>{menuOpen ? "−" : "+"}</span>
        </button>

        {menuOpen && (
          <div className="docs-mobile-menu">
            {sections.map((section) => (
              <button
                type="button"
                key={section.id}
                onClick={() =>
                  goToSection(section.id)
                }
              >
                <span>{section.number}</span>
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="docs-layout docs-container">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-inner">
            <p className="docs-sidebar-title">
              DOCUMENTATION
            </p>

            <nav>
              {sections.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() =>
                    goToSection(section.id)
                  }
                >
                  <span>{section.number}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="docs-content">
          {/* 01 PROJECT OVERVIEW */}

          <section
            id="overview"
            className="docs-section"
          >
            <SectionHeading
              number="01"
              label="PROJECT OVERVIEW"
              title="What is HomeNest?"
            />

            <div className="docs-highlight-card">
              <div>
                <span className="docs-small-label">
                  PROJECT
                </span>
                <h3>HomeNest</h3>
              </div>

              <p>
                A full-stack real-estate marketplace
                designed to connect property seekers
                with property owners and agents.
              </p>
            </div>

            <p className="docs-text">
              HomeNest is a real-estate web application
              where users can discover properties for
              buying or renting while property owners
              can publish and manage their listings.
            </p>

            <p className="docs-text">
              The platform brings property discovery,
              filtering, favorites, enquiries and visit
              scheduling into one organized application.
            </p>

            <div className="docs-three-grid">
              <InfoCard
                title="What?"
                text="A full-stack real-estate marketplace for property discovery and listing."
              />

              <InfoCard
                title="Why?"
                text="To simplify the process of finding properties and connecting seekers with owners."
              />

              <InfoCard
                title="Goal"
                text="Create a simple, responsive and organized property marketplace."
              />
            </div>
          </section>

          {/* 02 PROBLEM */}

          <section
            id="problem"
            className="docs-section"
          >
            <SectionHeading
              number="02"
              label="PROBLEM & SOLUTION"
              title="Why are we building HomeNest?"
            />

            <div className="docs-two-grid">
              <div className="docs-problem-card">
                <span className="docs-card-number">
                  PROBLEM
                </span>

                <h3>
                  Property discovery can be fragmented
                </h3>

                <p>
                  Property seekers may need to search
                  through different sources to find
                  suitable properties, compare options
                  and contact property owners.
                </p>

                <ul>
                  <li>
                    Property information across
                    different sources
                  </li>
                  <li>
                    Time-consuming property search
                  </li>
                  <li>
                    Difficulty comparing suitable
                    properties
                  </li>
                  <li>
                    Owners need a way to reach
                    interested users
                  </li>
                </ul>
              </div>

              <div className="docs-solution-card">
                <span className="docs-card-number">
                  SOLUTION
                </span>

                <h3>
                  One organized property marketplace
                </h3>

                <p>
                  HomeNest provides one platform for
                  discovering, shortlisting and
                  interacting with property listings.
                </p>

                <ul>
                  <li>Search and filter properties</li>
                  <li>View complete property details</li>
                  <li>Save favorite properties</li>
                  <li>Send property enquiries</li>
                  <li>Schedule property visits</li>
                  <li>Publish and manage listings</li>
                </ul>
              </div>
            </div>

            <FlowRow
              items={[
                "Search",
                "Filter",
                "Explore",
                "Shortlist",
                "Enquire",
                "Visit",
              ]}
            />
          </section>

          {/* 03 USERS */}

          <section
            id="users"
            className="docs-section"
          >
            <SectionHeading
              number="03"
              label="TARGET USERS"
              title="Who uses HomeNest?"
            />

            <div className="docs-three-grid">
              <UserCard
                icon="01"
                title="Visitor"
                items={[
                  "Browse properties",
                  "Search properties",
                  "Apply filters",
                  "View property details",
                  "Explore new projects",
                ]}
              />

              <UserCard
                icon="02"
                title="Property Seeker"
                items={[
                  "Save favorites",
                  "Send enquiries",
                  "Schedule visits",
                  "Manage profile",
                  "Track personal activity",
                ]}
              />

              <UserCard
                icon="03"
                title="Owner / Agent"
                items={[
                  "List properties",
                  "Publish listings",
                  "Edit properties",
                  "Activate or deactivate listings",
                  "Manage own listings",
                ]}
              />
            </div>

            <div className="docs-note">
              <strong>Scope note:</strong>
              <span>
                An administrative module can be added
                later for user management, property
                verification and content moderation.
              </span>
            </div>
          </section>

          {/* 04 REQUIREMENTS */}

          <section
            id="requirements"
            className="docs-section"
          >
            <SectionHeading
              number="04"
              label="REQUIREMENTS GATHERING"
              title="Functional & Non-Functional Requirements"
            />

            <p className="docs-text">
              Before development, the application
              requirements were divided into functional
              requirements and non-functional
              requirements.
            </p>

            <h3 className="docs-subheading">
              Functional Requirements
            </h3>

            <div className="docs-requirements-grid">
              <RequirementCard
                number="01"
                title="Authentication"
                text="User registration, login and account access."
              />
              <RequirementCard
                number="02"
                title="Property Discovery"
                text="Browse available real-estate listings."
              />
              <RequirementCard
                number="03"
                title="Search & Filters"
                text="Filter properties based on relevant criteria."
              />
              <RequirementCard
                number="04"
                title="Property Details"
                text="View complete information for a selected property."
              />
              <RequirementCard
                number="05"
                title="Favorites"
                text="Shortlist and save interesting properties."
              />
              <RequirementCard
                number="06"
                title="List Property"
                text="Allow owners to publish property information."
              />
              <RequirementCard
                number="07"
                title="My Listings"
                text="Manage properties published by the owner."
              />
              <RequirementCard
                number="08"
                title="Enquiries"
                text="Allow seekers to express interest in properties."
              />
              <RequirementCard
                number="09"
                title="Schedule Visit"
                text="Request a physical property visit."
              />
            </div>

            <h3 className="docs-subheading">
              Non-Functional Requirements
            </h3>

            <div className="docs-feature-list">
              <FeatureRow
                title="Responsiveness"
                text="The interface should adapt to desktop, tablet and mobile screens."
              />
              <FeatureRow
                title="Security"
                text="Protected operations should only be accessible to authenticated and authorized users."
              />
              <FeatureRow
                title="Usability"
                text="Navigation, forms and property information should be easy to understand."
              />
              <FeatureRow
                title="Performance"
                text="Pages and property information should load efficiently."
              />
              <FeatureRow
                title="Maintainability"
                text="Frontend and backend should use organized reusable structures."
              />
              <FeatureRow
                title="Scalability"
                text="The architecture should support additional users, properties and features in the future."
              />
            </div>
          </section>

          {/* 05 JOURNEY */}

          <section
            id="journey"
            className="docs-section"
          >
            <SectionHeading
              number="05"
              label="USER JOURNEY"
              title="How does a user travel through HomeNest?"
            />

            <h3 className="docs-subheading">
              Property Seeker Journey
            </h3>

            <FlowRow
              items={[
                "Home",
                "Properties",
                "Search / Filter",
                "Property Details",
                "Login",
                "Favorite / Enquire / Visit",
              ]}
            />

            <h3 className="docs-subheading">
              Property Owner Journey
            </h3>

            <FlowRow
              items={[
                "Login",
                "List Property",
                "Enter Details",
                "Property Features",
                "Publish",
                "My Listings",
              ]}
            />

            <div className="docs-connection-card">
              <div className="docs-person">
                <span>SEEKER</span>
                <strong>Finds a Property</strong>
              </div>

              <div className="docs-connection-line">
                <span>Enquiry / Visit</span>
              </div>

              <div className="docs-person">
                <span>OWNER</span>
                <strong>Lists a Property</strong>
              </div>
            </div>
          </section>

          {/* 06 PAGES */}

          <section
            id="pages"
            className="docs-section"
          >
            <SectionHeading
              number="06"
              label="PAGE PURPOSE"
              title="Main pages in HomeNest"
            />

            <div className="docs-page-table">
              <PageRow
                page="Home"
                purpose="Entry point, search and property discovery."
              />
              <PageRow
                page="Properties"
                purpose="Browse, search and filter available properties."
              />
              <PageRow
                page="Property Details"
                purpose="Display complete information about one property."
              />
              <PageRow
                page="Login / Register"
                purpose="Authenticate and create user accounts."
              />
              <PageRow
                page="Favorites"
                purpose="Store shortlisted properties."
              />
              <PageRow
                page="List Property"
                purpose="Allow owners to create and publish listings."
              />
              <PageRow
                page="My Listings"
                purpose="Manage properties belonging to the owner."
              />
              <PageRow
                page="Edit Property"
                purpose="Update an existing owner listing."
              />
              <PageRow
                page="Enquiry"
                purpose="Allow a seeker to express interest in a property."
              />
              <PageRow
                page="My Enquiries"
                purpose="View enquiries submitted by the user."
              />
              <PageRow
                page="Schedule Visit"
                purpose="Request a date and time to visit a property."
              />
              <PageRow
                page="Scheduled Visits"
                purpose="View property visit requests."
              />
              <PageRow
                page="New Projects"
                purpose="Explore new real-estate projects."
              />
              <PageRow
                page="Account"
                purpose="Manage user profile and account information."
              />
              <PageRow
                page="FAQ / Terms / Privacy"
                purpose="Provide supporting information and policies."
              />
              <PageRow
                page="404"
                purpose="Handle invalid or unavailable routes."
              />
            </div>
          </section>

          {/* 07 UI UX */}

          <section
            id="uiux"
            className="docs-section"
          >
            <SectionHeading
              number="07"
              label="UI / UX DESIGN"
              title="Responsive & Consistent Interface"
            />

            <p className="docs-text">
              HomeNest uses a clean real-estate focused
              interface with consistent typography,
              spacing, cards, forms, navigation and a
              teal-based visual identity.
            </p>

            <div className="docs-device-grid">
              <DeviceCard
                label="DESKTOP"
                size="Laptop / Desktop"
                text="Full navigation, wider sections and multi-column property layouts."
              />

              <DeviceCard
                label="TABLET"
                size="Tablet"
                text="Reduced columns, flexible spacing and responsive content."
              />

              <DeviceCard
                label="MOBILE"
                size="Mobile"
                text="Single-column layouts, compact navigation and touch-friendly controls."
              />
            </div>

            <div className="docs-design-system">
              <div>
                <span>Primary</span>
                <strong>#0F766E</strong>
                <i className="docs-color primary-color" />
              </div>

              <div>
                <span>Primary Dark</span>
                <strong>#115E59</strong>
                <i className="docs-color dark-color" />
              </div>

              <div>
                <span>Page Background</span>
                <strong>#F8FAF9</strong>
                <i className="docs-color background-color" />
              </div>

              <div>
                <span>Card</span>
                <strong>#FFFFFF</strong>
                <i className="docs-color card-color" />
              </div>
            </div>

            <div className="docs-note">
              <strong>Dynamic UI:</strong>
              <span>
                Property-specific form fields change
                according to the selected category.
                For example, Rental & PG uses
                accommodation and facilities, while
                residential properties use bedroom and
                bathroom information.
              </span>
            </div>
          </section>

          {/* 08 TECH */}

          <section
            id="tech"
            className="docs-section"
          >
            <SectionHeading
              number="08"
              label="TECHNOLOGY STACK"
              title="Technologies used to build HomeNest"
            />

            <div className="docs-tech-grid">
              <TechCard
                type="FRONTEND"
                title="React"
                subtitle="React + TypeScript"
                items={[
                  "Component-based UI",
                  "Type-safe development",
                  "React Router",
                  "Responsive CSS",
                  "Vite development environment",
                ]}
              />

              <TechCard
                type="BACKEND"
                title="Spring Boot"
                subtitle="Java Backend"
                items={[
                  "REST API development",
                  "Business logic",
                  "Request validation",
                  "Database integration",
                  "Application security",
                ]}
              />

              <TechCard
                type="DATABASE"
                title="PostgreSQL"
                subtitle="Relational Database"
                items={[
                  "Persistent application data",
                  "Structured relationships",
                  "Property information",
                  "User-related information",
                  "Reliable data storage",
                ]}
              />
            </div>
          </section>

          {/* 09 ARCHITECTURE */}

          <section
            id="architecture"
            className="docs-section"
          >
            <SectionHeading
              number="09"
              label="SYSTEM ARCHITECTURE"
              title="How the complete system communicates"
            />

            <div className="docs-architecture">
              <ArchitectureBox
                small="CLIENT"
                title="User"
                text="Browser"
              />

              <Arrow />

              <ArchitectureBox
                small="FRONTEND"
                title="React + TypeScript"
                text="UI • Routing • Forms"
              />

              <Arrow label="HTTP / REST" />

              <ArchitectureBox
                small="BACKEND"
                title="Spring Boot"
                text="API • Business Logic"
              />

              <Arrow label="JPA" />

              <ArchitectureBox
                small="DATABASE"
                title="PostgreSQL"
                text="Persistent Data"
              />
            </div>

            <div className="docs-explanation">
              <h3>Architecture Explanation</h3>

              <p>
                The React frontend does not directly
                access the PostgreSQL database. It
                communicates with the Spring Boot
                backend through HTTP requests and REST
                APIs.
              </p>

              <p>
                Spring Boot processes the request,
                performs the required business logic,
                communicates with the database and
                returns a response to the frontend.
              </p>
            </div>

            <h3 className="docs-subheading">
              Backend Layered Architecture
            </h3>

            <FlowRow
              items={[
                "Controller",
                "Service",
                "Repository",
                "PostgreSQL",
              ]}
            />

            <div className="docs-three-grid">
              <InfoCard
                title="Controller"
                text="Receives HTTP requests and returns responses."
              />

              <InfoCard
                title="Service"
                text="Contains application business logic."
              />

              <InfoCard
                title="Repository"
                text="Handles database access and persistence."
              />
            </div>
          </section>

          {/* 10 DATABASE */}

          <section
            id="database"
            className="docs-section"
          >
            <SectionHeading
              number="10"
              label="DATABASE DESIGN"
              title="Core data required by HomeNest"
            />

            <div className="docs-entity-grid">
              <EntityCard
                title="USER"
                fields={[
                  "User ID",
                  "Full Name",
                  "Email",
                  "Phone",
                  "Authentication Data",
                ]}
              />

              <EntityCard
                title="PROPERTY"
                fields={[
                  "Property ID",
                  "Owner ID",
                  "Title",
                  "Purpose",
                  "Category / Type",
                  "Location",
                  "Area",
                  "Price / Rent",
                  "Description",
                  "Features",
                  "Status",
                ]}
              />

              <EntityCard
                title="FAVORITE"
                fields={[
                  "Favorite ID",
                  "User ID",
                  "Property ID",
                ]}
              />

              <EntityCard
                title="ENQUIRY"
                fields={[
                  "Enquiry ID",
                  "User ID",
                  "Property ID",
                  "Message",
                  "Status",
                ]}
              />

              <EntityCard
                title="SCHEDULED VISIT"
                fields={[
                  "Visit ID",
                  "User ID",
                  "Property ID",
                  "Visit Date",
                  "Visit Time",
                  "Status",
                ]}
              />
            </div>

            <h3 className="docs-subheading">
              Entity Relationships
            </h3>

            <div className="docs-relationship">
              <div>
                <strong>User</strong>
                <span>1</span>
              </div>

              <p>creates</p>

              <div>
                <span>*</span>
                <strong>Property</strong>
              </div>
            </div>

            <div className="docs-relationship">
              <div>
                <strong>User</strong>
                <span>1</span>
              </div>

              <p>submits</p>

              <div>
                <span>*</span>
                <strong>Enquiry</strong>
              </div>

              <p>for</p>

              <div>
                <span>*</span>
                <strong>Property</strong>
              </div>
            </div>

            <div className="docs-relationship">
              <div>
                <strong>User</strong>
                <span>1</span>
              </div>

              <p>schedules</p>

              <div>
                <span>*</span>
                <strong>Visit</strong>
              </div>

              <p>for</p>

              <div>
                <span>*</span>
                <strong>Property</strong>
              </div>
            </div>
          </section>

          {/* 11 SECURITY */}

          <section
            id="security"
            className="docs-section"
          >
            <SectionHeading
              number="11"
              label="SECURITY"
              title="Authentication, Authorization & Ownership"
            />

            <div className="docs-two-grid">
              <InfoCard
                title="Authentication"
                text="Identifies who the current user is before allowing access to protected functionality."
              />

              <InfoCard
                title="Authorization"
                text="Determines whether the authenticated user is allowed to perform a requested operation."
              />
            </div>

            <h3 className="docs-subheading">
              Ownership Rule
            </h3>

            <div className="docs-security-example">
              <div>
                <span>ACCOUNT A</span>
                <strong>Creates Property X</strong>
              </div>

              <div className="docs-security-arrow">
                →
              </div>

              <div>
                <span>ACCOUNT B</span>
                <strong>Can View Property X</strong>
                <small>Cannot edit A's property</small>
              </div>
            </div>

            <div className="docs-note">
              <strong>Important:</strong>
              <span>
                Public visibility and ownership are
                different. A property can be visible to
                all users while modification remains
                restricted to its owner.
              </span>
            </div>
          </section>

          {/* 12 FLOW */}

          <section
            id="flow"
            className="docs-section"
          >
            <SectionHeading
              number="12"
              label="APPLICATION FLOW"
              title="What happens when a user performs an action?"
            />

            <h3 className="docs-subheading">
              Example: List Property
            </h3>

            <FlowRow
              items={[
                "User Form",
                "React",
                "REST API",
                "Controller",
                "Service",
                "Repository",
                "Database",
              ]}
            />

            <div className="docs-code-flow">
              <div>
                <span>01</span>
                <p>
                  User enters property information in
                  the React form.
                </p>
              </div>

              <div>
                <span>02</span>
                <p>
                  The frontend validates and sends the
                  property data to the backend.
                </p>
              </div>

              <div>
                <span>03</span>
                <p>
                  Spring Boot receives the request and
                  processes the business logic.
                </p>
              </div>

              <div>
                <span>04</span>
                <p>
                  The repository stores the property in
                  PostgreSQL.
                </p>
              </div>

              <div>
                <span>05</span>
                <p>
                  The backend returns the result to the
                  frontend.
                </p>
              </div>

              <div>
                <span>06</span>
                <p>
                  React updates the user interface with
                  the published property.
                </p>
              </div>
            </div>
          </section>

          {/* 13 TESTING */}

          <section
            id="testing"
            className="docs-section"
          >
            <SectionHeading
              number="13"
              label="TESTING"
              title="Major flows verified in HomeNest"
            />

            <div className="docs-testing-grid">
              <TestCard
                title="Public Flow"
                items={[
                  "Home",
                  "Properties",
                  "Filters",
                  "Property Details",
                  "New Projects",
                ]}
              />

              <TestCard
                title="Buyer Flow"
                items={[
                  "Login",
                  "Favorite",
                  "Enquire",
                  "Schedule Visit",
                  "Personal activity",
                ]}
              />

              <TestCard
                title="Owner Flow"
                items={[
                  "List Property",
                  "Publish",
                  "My Listings",
                  "Edit",
                  "Activate / Deactivate",
                ]}
              />

              <TestCard
                title="Account Isolation"
                items={[
                  "Owner-specific listings",
                  "User-specific favorites",
                  "Protected editing",
                  "Separate account activity",
                ]}
              />

              <TestCard
                title="Authentication"
                items={[
                  "Register",
                  "Login",
                  "Protected routes",
                  "Logout",
                  "Password reset flow",
                ]}
              />

              <TestCard
                title="Responsive UI"
                items={[
                  "Desktop",
                  "Tablet",
                  "Mobile",
                  "Forms",
                  "Navigation",
                ]}
              />
            </div>
          </section>

          {/* 14 CHALLENGES */}

          <section
            id="challenges"
            className="docs-section"
          >
            <SectionHeading
              number="14"
              label="CHALLENGES & SOLUTIONS"
              title="Important development decisions"
            />

            <Challenge
              number="01"
              title="Different property categories need different data"
              solution="The List Property form uses category-specific fields so residential, commercial, land, industrial and Rental & PG properties can collect relevant information."
            />

            <Challenge
              number="02"
              title="Public listings vs owner-specific management"
              solution="Properties are publicly discoverable while edit and management operations remain associated with the appropriate owner."
            />

            <Challenge
              number="03"
              title="User-specific application activity"
              solution="Favorites, enquiries and scheduled visits are associated with the respective user rather than being treated as shared activity."
            />

            <Challenge
              number="04"
              title="Protecting private functionality"
              solution="Authentication and protected routes are used for actions that require a registered user."
            />

            <Challenge
              number="05"
              title="Supporting multiple screen sizes"
              solution="Responsive layouts and breakpoints are used to adapt navigation, cards, forms and content to desktop, tablet and mobile screens."
            />
          </section>

          {/* 15 LIMITATIONS */}

          <section
            id="limitations"
            className="docs-section"
          >
            <SectionHeading
              number="15"
              label="CURRENT SCOPE & LIMITATIONS"
              title="What HomeNest currently focuses on"
            />

            <p className="docs-text">
              HomeNest primarily focuses on property
              discovery, listing management and
              communication between property seekers
              and owners.
            </p>

            <div className="docs-limit-grid">
              <LimitCard text="No legal property registration or ownership transfer" />
              <LimitCard text="No complete online property payment processing" />
              <LimitCard text="No loan approval or financial processing" />
              <LimitCard text="Advanced property verification can be added later" />
              <LimitCard text="Large-scale cloud architecture is future scope" />
              <LimitCard text="Advanced recommendation features can be extended later" />
            </div>
          </section>

          {/* 16 FUTURE */}

          <section
            id="future"
            className="docs-section"
          >
            <SectionHeading
              number="16"
              label="FUTURE SCOPE"
              title="How HomeNest can grow"
            />

            <div className="docs-future-grid">
              <FutureCard
                number="01"
                title="Property Verification"
                text="Verification workflow for trusted property listings."
              />
              <FutureCard
                number="02"
                title="Map Search"
                text="Location and map-based property discovery."
              />
              <FutureCard
                number="03"
                title="Cloud Image Storage"
                text="Scalable storage for property images and media."
              />
              <FutureCard
                number="04"
                title="Notifications"
                text="Email, application and visit notifications."
              />
              <FutureCard
                number="05"
                title="Owner Dashboard"
                text="Analytics for listings, enquiries and user interest."
              />
              <FutureCard
                number="06"
                title="Admin Module"
                text="User, listing and platform moderation."
              />
              <FutureCard
                number="07"
                title="Recommendations"
                text="Personalized property suggestions."
              />
              <FutureCard
                number="08"
                title="Cloud Deployment"
                text="Scalable production infrastructure and monitoring."
              />
            </div>
          </section>

          {/* 17 CONCLUSION */}

          <section
            id="conclusion"
            className="docs-section docs-conclusion"
          >
            <SectionHeading
              number="17"
              label="CONCLUSION"
              title="HomeNest Full-Stack Application"
            />

            <p>
              HomeNest demonstrates the complete
              development of a real-estate web
              application, starting from identifying
              the problem and gathering requirements
              through UI/UX design, frontend
              development, backend development,
              database integration and testing.
            </p>

            <div className="docs-final-flow">
              <span>Requirements</span>
              <b>→</b>
              <span>UI / UX</span>
              <b>→</b>
              <span>React</span>
              <b>→</b>
              <span>Spring Boot</span>
              <b>→</b>
              <span>PostgreSQL</span>
              <b>→</b>
              <span>Testing</span>
            </div>

            <div className="docs-final-card">
              <span>PROJECT GOAL</span>

              <h3>
                Connecting property seekers and
                property owners through one organized
                digital platform.
              </h3>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

type SectionHeadingProps = {
  number: string;
  label: string;
  title: string;
};

function SectionHeading({
  number,
  label,
  title,
}: SectionHeadingProps) {
  return (
    <div className="docs-section-heading">
      <div className="docs-section-label">
        <span>{number}</span>
        {label}
      </div>

      <h2>{title}</h2>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="docs-info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function UserCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="docs-user-card">
      <span className="docs-user-icon">
        {icon}
      </span>

      <h3>{title}</h3>

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function RequirementCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="docs-requirement-card">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FeatureRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="docs-feature-row">
      <div className="docs-check">✓</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FlowRow({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="docs-flow">
      {items.map((item, index) => (
        <div
          className="docs-flow-part"
          key={`${item}-${index}`}
        >
          <div className="docs-flow-box">
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{item}</strong>
          </div>

          {index < items.length - 1 && (
            <div className="docs-flow-arrow">
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PageRow({
  page,
  purpose,
}: {
  page: string;
  purpose: string;
}) {
  return (
    <div className="docs-page-row">
      <strong>{page}</strong>
      <p>{purpose}</p>
    </div>
  );
}

function DeviceCard({
  label,
  size,
  text,
}: {
  label: string;
  size: string;
  text: string;
}) {
  return (
    <div className="docs-device-card">
      <span>{label}</span>

      <div className="docs-device-illustration">
        <div />
      </div>

      <h3>{size}</h3>
      <p>{text}</p>
    </div>
  );
}

function TechCard({
  type,
  title,
  subtitle,
  items,
}: {
  type: string;
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="docs-tech-card">
      <span>{type}</span>

      <h3>{title}</h3>
      <p>{subtitle}</p>

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureBox({
  small,
  title,
  text,
}: {
  small: string;
  title: string;
  text: string;
}) {
  return (
    <div className="docs-architecture-box">
      <span>{small}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function Arrow({
  label,
}: {
  label?: string;
}) {
  return (
    <div className="docs-architecture-arrow">
      {label && <span>{label}</span>}
      <strong>→</strong>
    </div>
  );
}

function EntityCard({
  title,
  fields,
}: {
  title: string;
  fields: string[];
}) {
  return (
    <div className="docs-entity-card">
      <div className="docs-entity-header">
        {title}
      </div>

      <div className="docs-entity-fields">
        {fields.map((field) => (
          <div key={field}>{field}</div>
        ))}
      </div>
    </div>
  );
}

function TestCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="docs-test-card">
      <div className="docs-test-heading">
        <span>✓</span>
        <h3>{title}</h3>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Challenge({
  number,
  title,
  solution,
}: {
  number: string;
  title: string;
  solution: string;
}) {
  return (
    <div className="docs-challenge">
      <span>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>
          <strong>Solution:</strong> {solution}
        </p>
      </div>
    </div>
  );
}

function LimitCard({
  text,
}: {
  text: string;
}) {
  return (
    <div className="docs-limit-card">
      <span>—</span>
      <p>{text}</p>
    </div>
  );
}

function FutureCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="docs-future-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default ProjectDocumentation;