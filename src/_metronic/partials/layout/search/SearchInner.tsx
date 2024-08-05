import { useState, useEffect } from 'react'
import { KTIcon } from '../../../helpers'
import { search } from '../../../../app/modules/auth/core/_requests' // Import your search function
const SearchInner = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.length >= 2) { // Adjust length check if needed
        setLoading(true);
        setError(null);
        try {
          const data = await search(query);
          setResults(data); // Adjust based on API response structure
        } catch (err) {
          setError('Failed to fetch results.');
        } finally {
          setLoading(false);
        }
      }
    };

    handleSearch();
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <div key={index}>{/* Display your result here */}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInner;
