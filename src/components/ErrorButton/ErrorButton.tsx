import { Component } from 'react';

export default class ErrorButton extends Component {
  render() {
    return (
      <button className="px-4 rounded-full h-10 bg-red-400 hover:cursor-pointer text-lg text-white font-bold sticky z-40 bottom-16">
        Create error
      </button>
    );
  }
}
