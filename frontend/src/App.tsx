import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";

import Favorites from "./pages/Favorites";

import ListProperty from "./pages/ListProperty";
import EditProperty from "./pages/EditProperty";

import NewProjects from "./pages/NewProjects";
import NewProjectDetails from "./pages/NewProjectDetails";

import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

import ProjectDocumentation from "./pages/ProjectDocumentation";

import Account from "./pages/Account";

import MyListings from "./pages/MyListings";
import MyEnquiries from "./pages/MyEnquiries";
import ScheduledVisits from "./pages/ScheduledVisits";

import Enquiry from "./pages/Enquiry";
import ScheduleVisit from "./pages/ScheduleVisit";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        {/* Properties */}
        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        {/* New Projects */}
        <Route
          path="/new-projects"
          element={<NewProjects />}
        />

        <Route
          path="/new-projects/:id"
          element={<NewProjectDetails />}
        />

        {/* Company */}
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Information */}
        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        {/* Project Documentation */}
        <Route
          path="/project-documentation"
          element={<ProjectDocumentation />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>
          {/* Account */}
          <Route
            path="/account"
            element={<Account />}
          />

          {/* Favorites */}
          <Route
            path="/favorites"
            element={<Favorites />}
          />

          {/* Property Management */}
          <Route
            path="/list-property"
            element={<ListProperty />}
          />

          <Route
            path="/edit-property/:id"
            element={<EditProperty />}
          />

          <Route
            path="/my-listings"
            element={<MyListings />}
          />

          {/* Enquiries */}
          <Route
            path="/my-enquiries"
            element={<MyEnquiries />}
          />

          <Route
            path="/properties/:id/enquire"
            element={<Enquiry />}
          />

          {/* Scheduled Visits */}
          <Route
            path="/scheduled-visits"
            element={<ScheduledVisits />}
          />

          <Route
            path="/properties/:id/schedule-visit"
            element={<ScheduleVisit />}
          />
        </Route>

        {/* =========================
            404 - KEEP LAST
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;