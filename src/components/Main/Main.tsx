import { Component } from 'react';
import CharacterCard, {
  type CharacterInfo,
} from '../CharacterCard/CharacterCard';
import MainLoader from '../MainLoader/MainLoader';

type MainProps = object;

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

  async componentDidMount(): Promise<void> {
    try {
      const request = await fetch('https://rickandmortyapi.com/api/character');
      if (!request.ok)
        throw new Error('Could not load your favorite characters');
      const parsed = await request.json();
      this.setState({ characters: parsed.results, loading: false });
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
    if (error)
      return <main className="bg-blue-900 flex-grow">Error: {error}</main>;
    return (
      <main className="bg-blue-900 flex-grow">
        <div
          className="flex flex-wrap gap-6 py-4 items-center justify-center"
          aria-label="characters-cards-container"
        >
          {characters.map((characterInfo) => (
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
