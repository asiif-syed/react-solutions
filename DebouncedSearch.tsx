
const SearchBar = ({
  onSearch,
  placeHolder,
}: {
  placeHolder: string;
  onSearch: (value: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceHandler = useRef<NodeJS.Timeout | null>(null); // useRef to store the debounce timer
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clearDebounceRef();
      onSearch(debouncedQuery);
    }
  };

  return (
    <input
      placeholder={placeHolder}
      onSearch={onSearch}
      onChange={(e: any) => setQuery(e?.target?.value)}
      value={query}
      style={{ width: "50%" }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
