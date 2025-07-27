import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/CharacterList/CharacterList';
import { Component } from 'react';

type AppProps = object;
interface AppState {
  searchQuery: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('search') ?? '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <div className="min-h-screen flex flex-col relative w-full">
        <Header
          onSearchSubmit={this.handleSearchChange}
          searchQuery={this.state.searchQuery}
        />
        <Main searchedTerm={this.state.searchQuery} />
        <Footer />
      </div>
    );
  }
}

export default App;
