import './App.css';
import Footer from './components/Footer/Footer';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

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
        <Header />
        <main className="bg-blue-900 flex-grow flex items-center justify-center text-white text-xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
