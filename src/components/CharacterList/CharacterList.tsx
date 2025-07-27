import { Component } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import MainLoader from '../MainLoader/MainLoader';
import { fetchCharacters } from '../../api/api-client';
import type { CharacterInfo } from '../../types/character';

type CharacterListProps = { searchedTerm: string };

interface CharacterListState {
  characters: CharacterInfo[] | undefined;
  loading: boolean;
  error: null | string;
}

export default class CharacterList extends Component<
  CharacterListProps,
  CharacterListState
> {
  constructor(props: CharacterListProps) {
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

  componentDidUpdate(prevProps: CharacterListProps) {
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
    const containerClassName =
      'bg-blue-900 flex-grow flex items-center justify-center text-white text-xl';
    if (loading)
      return (
        <div className="bg-blue-900 flex-grow flex items-center justify-center">
          <MainLoader />
        </div>
      );
    if (error) {
      return <div className={containerClassName}>Error: {error}</div>;
    }

    if (!characters) {
      return (
        <div className={containerClassName}>Cannot retrieve characters.</div>
      );
    }

    if (characters?.length === 0) {
      return <div className={containerClassName}>No characters found.</div>;
    }

    return (
      <div className={containerClassName}>
        <div
          className="flex flex-wrap gap-6 p-2 py-4 items-center justify-center"
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
      </div>
    );
  }
}
