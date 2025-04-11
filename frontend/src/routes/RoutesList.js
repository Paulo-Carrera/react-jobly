import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import UserContext from "../context/UserContext";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an anonymous component defined in this
 * file.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

function RoutesList({ login, signup }) {
  const { currentUser } = useContext(UserContext);

  // PrivateRoute is a component that only shows children if a user is logged in
  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      <Route
        path="/companies"
        element={
          <PrivateRoute>
            <CompanyList />
          </PrivateRoute>
        }
      />
      <Route
        path="/companies/:handle"
        element={
          <PrivateRoute>
            <CompanyDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <JobList />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileForm />
          </PrivateRoute>
        }
      />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
