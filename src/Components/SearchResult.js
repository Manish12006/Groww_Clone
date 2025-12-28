import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleClick = () => {
    // Navigate to the path corresponding to the result
    navigate(`/${result.toLowerCase()}`); // Convert result to lower case for path
  };

  return (
    <div
      className="search-result"
      onClick={handleClick} // Navigate on click
    >
      {result} 
    </div>
  );
};

export default SearchResult;
