/*
  A common Debounced search component
  Calls the api to search after 500s of typing
  Calls the api when user hits on the enter key to search
*/

const SearchBar = ({ onSearch, placeHolder }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceHandler = (useRef < NodeJS.Timeout) | (null > null); // useRef to store the debounce timer
  
  const clearDebounceRef = () => {
    if (debounceHandler.current) {
      clearTimeout(debounceHandler.current);
    }
  };
  useEffect(() => {
    clearDebounceRef();
    debounceHandler.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return clearDebounceRef;
  }, [query]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clearDebounceRef();
      onSearch(debouncedQuery);
    }
  };

  return (
    <input
      placeholder={placeHolder}
      onSearch={onSearch}
      onChange={(e) => setQuery(e?.target?.value)}
      value={query}
      style={{ width: "50%" }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
