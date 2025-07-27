import { Link, useParams } from 'react-router-dom';
import type { CharacterInfo } from '../../types/character';

export default function CharacterCard({
  characterInfo,
}: {
  characterInfo?: CharacterInfo;
}) {
  const { page: pageParam } = useParams();

  if (!characterInfo) {
    return (
      <div className="flex items-center justify-center bg-blue-500 rounded-3xl p-6 w-48 h-64">
        <div className="text-lg text-white font-bold">
          Character information is missing
        </div>
      </div>
    );
  }
  const page = Number(pageParam ?? '1');

  return (
    <Link to={`/${page}/${characterInfo.id}`}>
      <div
        className="flex flex-col gap-2 bg-blue-500 rounded-3xl p-6 w-48 h-64"
        data-testid="character-card"
        role="character-card"
      >
        <img
          src={characterInfo?.image}
          className="rounded-3xl"
          alt="Character portrait"
        />
        <div className="text-lg text-white font-bold">
          {characterInfo?.name}
        </div>
      </div>
    </Link>
  );
}
