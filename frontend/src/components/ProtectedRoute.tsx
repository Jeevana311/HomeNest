import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

function ProtectedRoute() {
  const location =
    useLocation();

  const localUser =
    localStorage.getItem(
      "homeNestCurrentUser"
    );

  const sessionUser =
    sessionStorage.getItem(
      "homeNestCurrentUser"
    );

  const isLoggedIn =
    Boolean(
      localUser ||
      sessionUser
    );

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname:
              location.pathname,

            search:
              location.search,
          },
        }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;