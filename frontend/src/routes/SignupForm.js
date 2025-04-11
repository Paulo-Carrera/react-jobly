import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // handle form submit
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  // update form data field
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  }

  return (
    <div className="SignupForm">
      <h2 className="mb-3">Sign Up</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group mb-3">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <button type="submit" className="btn btn-primary float-end mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
