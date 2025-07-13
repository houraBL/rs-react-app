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
      <ErrorBoundary key={this.state.search}>
        <div className="min-h-screen flex flex-col relative">
          <Header onSearchSubmit={this.handleSearchChange} />
          <Main searchedTerm={this.state.search} />
          <Footer />
          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
