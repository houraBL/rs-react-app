import { Component } from 'react';

interface ErrorButtonState {
  throwError: boolean;
}

export default class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { throwError: false };
    this.triggerError = this.triggerError.bind(this);
  }

  triggerError() {
    this.setState({ throwError: true });
  }

  render() {
    if (this.state.throwError) {
      throw new Error('Manual Error!');
    }
    return (
      <button
        className="px-4 rounded-full h-10 bg-red-400 hover:cursor-pointer text-lg text-white font-bold fixed z-50 bottom-8 right-4"
        onClick={this.triggerError}
      >
        Create error
      </button>
    );
  }
}
