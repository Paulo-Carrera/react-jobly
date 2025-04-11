import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  // update form data field
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({
      ...l,
      [name]: value,
    }));
  }

  return (
    <div className="LoginForm">
      <h2 className="mb-3">Log In</h2>
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
                autoComplete="current-password"
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

export default LoginForm;
