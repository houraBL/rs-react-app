import { Component } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';

type MainProps = object;

interface MainState {
  characters: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }[];
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

  async componentDidMount(): void {
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
    if (loading) return <main>Loading...</main>;
    if (error) return <main>Error: {error}</main>;
    return (
      <main className="bg-blue-900">
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
