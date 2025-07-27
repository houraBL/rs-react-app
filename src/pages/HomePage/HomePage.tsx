import { Component } from 'react';
import Search from '../../components/Search/Search';
import CharacterList from '../../components/CharacterList/CharacterList';

type HomePageProps = object;
interface HomePageState {
  searchQuery: string;
}

export default class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
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
      <div className="h-full min-h-[400px] flex flex-col relative w-full">
        <Search
          onSearchSubmit={this.handleSearchChange}
          searchQuery={this.state.searchQuery}
        />
        <CharacterList searchedTerm={this.state.searchQuery} />
      </div>
    );
  }
}
