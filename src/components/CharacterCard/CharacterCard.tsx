import { Component } from 'react';

type CharacterCardProps = { characterInfo: CharacterInfo };

interface CharacterInfo {
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
}

interface CharacterCardState {
  characterInfo: CharacterInfo;
  loading: boolean;
  error: null | string;
}
export default class CharacterCard extends Component<
  CharacterCardProps,
  CharacterCardState
> {
  constructor(props: CharacterCardProps) {
    super(props);
    this.state = {
      characterInfo: props.characterInfo,
      loading: true,
      error: null,
    };
  }

  render() {
    return (
      <div className="flex flex-col gap-2 bg-blue-500 rounded-3xl p-6 w-48 h-64">
        <img
          src={this.state.characterInfo.image}
          className=" rounded-3xl"
          alt="Vite logo"
        />
        <div className="text-lg text-white font-bold">
          {this.state.characterInfo.name}
        </div>
      </div>
    );
  }
}
