import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../helpers/JoblyApi";
import JobCard from "../components/JobCard";
import SearchForm from "../components/SearchForm";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="JobList">
      <SearchForm search={search} />
      {jobs.map(job => (
        <JobCard 
          key={job.id}
          job={job} // Pass the full job object
        />
      ))}
    </div>
  );
}

export default JobList;
