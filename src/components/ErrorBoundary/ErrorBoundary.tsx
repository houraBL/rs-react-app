import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
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
        <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold">Something went wrong!</h1>
          <p className="mt-2">{this.state.errorMessage}</p>
          <button
            onClick={this.handleReset}
            className="mt-6 px-6 py-2 rounded-full bg-white text-blue-900 font-bold hover:bg-blue-100 transition hover:cursor-pointer"
          >
            Reset App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
