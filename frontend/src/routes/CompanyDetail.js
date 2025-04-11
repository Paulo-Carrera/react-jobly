import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import JoblyApi from "../helpers/JoblyApi";
import JobCard from "../components/JobCard";
import UserContext from "../context/UserContext";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
      } catch (err) {
        console.error("Company not found", err);
        setCompany(null);
      }
    }
    getCompany();
  }, [handle]);

  if (!currentUser) return <Navigate to="/login" />;
  if (!company) return <div>Loading...</div>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <div>
        {company.jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;