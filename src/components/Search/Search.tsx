'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  type ChangeEvent,
  type FormEvent,
  useLayoutEffect,
  useState,
} from 'react';

type SearchProps = {
  onSearchSubmit: (searchTerm: string) => void;
  searchQuery: string;
};

export default function Search({ onSearchSubmit, searchQuery }: SearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams?.get('name') || '';
  useLayoutEffect(() => {
    if (!urlSearch) {
      if (searchQuery && searchQuery !== '') {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('name', searchQuery);
      } else if (searchQuery === '') {
        setInputValue(searchQuery);
      }
    } else {
      setInputValue(urlSearch);
    }
  }, [urlSearch, searchQuery, searchParams]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed) {
      router.replace(`/1?name=${encodeURIComponent(trimmed)}`);
    } else {
      router.replace(`/1`);
    }
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
    <div className="pt-2 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 items-center justify-center"
        role="search"
      >
        <label
          htmlFor="search-input"
          className="px-2 text-lg font-bold hover:cursor-pointer"
        >
          Look up a character:
        </label>
        <div className="p-2 flex flex-wrap gap-2 items-center justify-center relative">
          <input
            id="search-input"
            value={inputValue}
            onChange={handleSearchInputChange}
            className="bg-blue-100 dark:bg-blue-600 rounded-full h-10 outline-0 px-4 pr-10 text-lg text-blue-800 dark:text-white font-semibold w-3xs"
            autoCorrect="off"
            spellCheck="false"
            placeholder="start typing..."
          ></input>
          <button
            type="button"
            onClick={handleClear}
            className="w-8 h-8 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-bold cursor-pointer rounded-full hover:bg-blue-200 dark:hover:bg-blue-500 absolute right-4"
            aria-label="Clear search"
          >
            ✕
          </button>
        </div>

        <button
          type="submit"
          aria-label="Process search"
          className="px-4 rounded-full h-10 hover:cursor-pointer text-lg font-bold text-blue-900 bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
}
