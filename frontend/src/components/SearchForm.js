import React, { useState } from "react";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that users can narrow down the list.
 *
 * This component doesn't do the searching itself, but rather just calls the
 * search function prop it receives.
 */

function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <form className="SearchForm mb-4" onSubmit={handleSubmit}>
      <input
        name="searchTerm"
        className="form-control form-control-lg"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-primary btn-lg mt-3">Search</button>
    </form>
  );
}

export default SearchForm;
