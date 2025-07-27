import { Component, type ChangeEvent, type FormEvent } from 'react';

type HeaderProps = {
  onSearchSubmit: (searchTerm: string) => void;
  searchQuery: string;
};
interface HeaderState {
  currentSearchInput: string;
}

export default class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      currentSearchInput: this.props.searchQuery,
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ currentSearchInput: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = this.state.currentSearchInput.trim();
    localStorage.setItem('search', trimmed);
    this.setState({ currentSearchInput: trimmed });
    this.props.onSearchSubmit(trimmed);
  }

  handleClear() {
    this.setState({ currentSearchInput: '' });
    localStorage.setItem('search', '');
    this.props.onSearchSubmit('');
  }

  render() {
    return (
      <header className="z-40 sticky top-0 h-14 bg-blue-500 drop-shadow-xl drop-shadow-blue-950">
        <form
          onSubmit={this.handleSubmit}
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
              value={this.state.currentSearchInput}
              onChange={this.handleSearchInputChange}
              className="bg-blue-100 rounded-full h-10 outline-0 px-4 pr-10 text-lg text-blue-800 font-semibold w-3xs"
              autoCorrect="off"
              spellCheck="false"
              placeholder="start typing..."
            ></input>
            <button
              type="button"
              onClick={this.handleClear}
              className="w-8 h-8 flex items-center justify-center text-blue-400 text-2xl font-bold cursor-pointer rounded-full hover:bg-blue-200 transition absolute right-4"
              aria-label="Clear search"
            >
              ✕
            </button>
          </div>

          <button
            type="submit"
            aria-label="Process search"
            className="px-4 rounded-full h-10 bg-blue-800 hover:cursor-pointer text-lg text-white font-bold"
          >
            Search
          </button>
        </form>
      </header>
    );
  }
}
