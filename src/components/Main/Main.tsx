import { Component } from 'react';
import CharacterCard, {
  type CharacterInfo,
} from '../CharacterCard/CharacterCard';
import MainLoader from '../MainLoader/MainLoader';
import { fetchCharacters } from '../../api/api-client';

type MainProps = { searchedTerm: string };

interface MainState {
  characters: CharacterInfo[];
  loading: boolean;
  error: null | string;
}

export default class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadCharacters(this.props.searchedTerm);
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchedTerm !== this.props.searchedTerm) {
      this.loadCharacters(this.props.searchedTerm);
    }
  }

  async loadCharacters(searchTerm: string) {
    this.setState({ loading: true, error: null });
    try {
      const characters = await fetchCharacters(searchTerm);
      this.setState({ characters, loading: false });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.setState({ error: message, loading: false });
    }
  }

  render() {
    const { characters, loading, error } = this.state;
    if (loading)
      return (
        <main className="bg-blue-900 flex-grow flex items-center justify-center">
          <MainLoader />
        </main>
      );
    if (error) {
      console.log('hello');
      return <main className="bg-blue-900 flex-grow">Error: {error}</main>;
    }

    if (characters.length === 0) {
      return (
        <main className="bg-blue-900 flex-grow flex items-center justify-center text-white text-xl">
          No characters found.
        </main>
      );
    }

    return (
      <main className="bg-blue-900 flex-grow">
        <div
          className="flex flex-wrap gap-6 py-4 items-center justify-center"
          aria-label="characters-cards-container"
        >
          {characters &&
            characters.map((characterInfo) => (
              <CharacterCard
                key={characterInfo.id}
                characterInfo={characterInfo}
              />
            ))}
        </div>
      </main>
    );
  }
}
