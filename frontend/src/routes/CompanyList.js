import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../helpers/JoblyApi";
import CompanyCard from "../components/CompanyCard";
import SearchForm from "../components/SearchForm";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="CompanyList">
      <SearchForm search={search} /> {/* Fixed prop name here */}
      {companies.map(c => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;
