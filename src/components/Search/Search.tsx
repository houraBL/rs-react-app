import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchProps = {
  onSearchSubmit: (searchTerm: string) => void;
  searchQuery: string;
};

export default function Search({ onSearchSubmit, searchQuery }: SearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('name');
  useEffect(() => {
    if (!urlSearch) {
      if (searchQuery && searchQuery !== '') {
        setSearchParams({ name: searchQuery, page: '1' });
      } else if (searchQuery === '') {
        setInputValue(searchQuery);
      }
    } else {
      setInputValue(urlSearch);
    }
  }, [urlSearch, searchQuery, setSearchParams]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitSearch = (term: string) => {
    const trimmed = term.trim();
    setSearchParams({});
    setInputValue(trimmed);
    onSearchSubmit(trimmed);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(inputValue);
  };

  const handleClear = () => {
    submitSearch('');
  };

  return (
    <div className="pt-2 bg-blue-900 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 items-center justify-center"
        role="search"
      >
        <label
          htmlFor="search-input"
          className="px-2 text-lg text-white font-bold hover:cursor-pointer"
        >
          Look up a character:
        </label>
        <div className="p-2 flex flex-wrap gap-2 items-center justify-center relative">
          <input
            id="search-input"
            value={inputValue}
            onChange={handleSearchInputChange}
            className="bg-blue-100 rounded-full h-10 outline-0 px-4 pr-10 text-lg text-blue-800 font-semibold w-3xs"
            autoCorrect="off"
            spellCheck="false"
            placeholder="start typing..."
          ></input>
          <button
            type="button"
            onClick={handleClear}
            className="w-8 h-8 flex items-center justify-center text-blue-400 text-2xl font-bold cursor-pointer rounded-full hover:bg-blue-200 transition absolute right-4"
            aria-label="Clear search"
          >
            ✕
          </button>
        </div>

        <button
          type="submit"
          aria-label="Process search"
          className="px-4 rounded-full h-10 bg-blue-500 hover:cursor-pointer text-lg text-white font-bold"
        >
          Search
        </button>
      </form>
    </div>
  );
}
