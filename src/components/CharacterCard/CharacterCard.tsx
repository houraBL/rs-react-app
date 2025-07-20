import { Component } from 'react';
import type { CharacterInfo } from '../../types/character';

type CharacterCardProps = { characterInfo: CharacterInfo };

export default class CharacterCard extends Component<CharacterCardProps> {
  render() {
    const { characterInfo } = this.props;
    return (
      <div className="flex flex-col gap-2 bg-blue-500 rounded-3xl p-6 w-48 h-64">
        <img
          src={characterInfo.image}
          className="rounded-3xl"
          alt="Character portrait"
        />
        <div className="text-lg text-white font-bold">{characterInfo.name}</div>
      </div>
    );
  }
}
