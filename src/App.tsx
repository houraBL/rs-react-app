import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';

type AppProps = object;
interface AppState {
  search: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      search: localStorage.getItem('search') ?? '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange = (value: string) => {
    this.setState({ search: value });
  };

  render() {
    return (
      <div className="min-h-screen flex flex-col relative w-full">
        <ErrorBoundary>
          <Header onSearchSubmit={this.handleSearchChange} />
          <Main searchedTerm={this.state.search} />
          <ErrorButton />
          <Footer />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
