import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { Component } from 'react';

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
      <div className="min-h-screen flex flex-col">
        <Header onSearchSubmit={this.handleSearchChange} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
