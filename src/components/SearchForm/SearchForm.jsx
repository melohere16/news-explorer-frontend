import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(query);
  }

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          required
          type="text"
          placeholder="Enter topic"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button className="search-form__button" type="submit">
          Search
        </button>
      </form>
      {error && <span className="search-form__error">{error}</span>}
    </div>
  );
}

export default SearchForm;
