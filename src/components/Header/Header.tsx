import { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className="z-40 sticky top-0 h-14 bg-blue-500 flex flex-wrap gap-2 items-center justify-center">
        <label
          htmlFor="search-input"
          className="p-2 text-lg text-white font-bold hover:cursor-pointer"
        >
          Look up a character:
        </label>
        <input
          id="search-input"
          className="bg-blue-100 rounded-full h-10 outline-0 px-4 text-lg text-blue-800 font-semibold"
          autoCorrect="off"
          spellCheck="false"
        ></input>
        <button className="px-4 rounded-full h-10 bg-blue-800 hover:cursor-pointer text-lg text-white font-bold">
          Search
        </button>
      </header>
    );
  }
}
