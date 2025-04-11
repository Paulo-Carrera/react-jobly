import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import JoblyApi from "../helpers/JoblyApi";

function JobCard({ job }) {
  const { currentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  if (!job) return null;

  const { id, title, salary, equity } = job;

  async function apply() {
    await JoblyApi.applyToJob(currentUser.username, id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
        <button className="btn btn-primary" onClick={apply} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
