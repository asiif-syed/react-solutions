const SearchBar = ({
  onSearch,
  placeHolder,
}: {
  placeHolder: string;
  onSearch: (value: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  let debounceHandler: any;

  useEffect(() => {
    // Setting up debounced query once user stops typing
    debounceHandler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    //Clearing the timer
    return () => clearTimeout(debounceHandler);
  }, [query]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Clearing out the timer if user hits enter and calling the callback
      clearTimeout(debounceHandler);
      onSearch(debouncedQuery);
    }
  };

  return (
    <input
      placeholder={placeHolder}
      onChange={(e: any) => setQuery(e?.target?.value)}
      value={query}
      style={{ width: "50%" }}
      onKeyDown={handleKeyDown}
      allowClear
    />
  );
};

export default SearchBar;
