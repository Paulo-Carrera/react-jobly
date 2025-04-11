import React from "react";
import { Link } from "react-router-dom";

/** Show limited information about a company.
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ company }) {
  const { handle, name, description, logoUrl } = company;
  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
