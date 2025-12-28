import { useState } from "react";
import "./SearchBar.css";

// List of predefined options
const options = ["Zomato", "Tatasteel", "HDFC","SBI","TCS"];

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  // Filter the predefined options based on user input
  const filterOptions = (value) => {
    if (value === "") {
      setResults([]); // Clear results if input is empty
    } else {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    filterOptions(value); // Filter options based on input
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
