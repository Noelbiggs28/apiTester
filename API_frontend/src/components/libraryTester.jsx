import { useState } from "react";

export default function LibraryTester() {
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("title"); // Default to searching by title

  const fetchBooks = async (context) => {
    let useableContext = context.title.replace(/ /g, "+")
    try {
      let url;
      if (searchType === "author") {
        url = `http://localhost:8000/library/author/?author=${useableContext}`;
      } else {
        url = `http://localhost:8000/library/title/?title=${useableContext}`;
      }
      console.log(url)
      const apiData = await fetch(url);
      const apiJSON = await apiData.json();

      if (apiJSON.docs) {
        setSearchResults(apiJSON.docs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const context = { title };
    await fetchBooks(context);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div id="title">
          <label htmlFor="title">Search by:</label>
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Search Results:</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              Author: {result.author_name}, Title: {result.title}
              <img src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`} alt="Book Cover" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
