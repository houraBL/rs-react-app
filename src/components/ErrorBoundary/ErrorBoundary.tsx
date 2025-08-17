'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset() {
    this.setState({ hasError: false, errorMessage: '' });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-white">
          <h1 className="text-2xl font-bold">Something went wrong!</h1>
          <p className="mt-2">{this.state.errorMessage}</p>
          <button
            onClick={this.handleReset}
            className="mt-6 px-6 py-2 rounded-full hover:cursor-pointer font-bold text-blue-900 bg-blue-300 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            Reset App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
