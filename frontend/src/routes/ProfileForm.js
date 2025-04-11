import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Alert from "../components/Alert";

function ProfileForm({ saveProfile }) {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    username: currentUser.username,
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  // handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    const result = await saveProfile(formData.username, profileData);
    if (result.success) {
      setFormErrors([]);
      setSaveConfirmed(true);
    } else {
      setFormErrors(result.errors);
    }
  }

  // update local form state
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3 className="mb-3">Profile</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
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
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully."]} />
            ) : null}

            <button
              className="btn btn-primary float-end mt-3"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
