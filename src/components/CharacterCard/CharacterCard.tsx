import { Link, useParams } from 'react-router-dom';
import type { CharacterInfo } from '../../types/character';

export default function CharacterCard({
  characterInfo,
}: {
  characterInfo?: CharacterInfo;
}) {
  const { pageId } = useParams();

  if (!characterInfo) {
    return (
      <div className="flex items-center justify-center bg-blue-500 rounded-3xl p-6 w-48 h-64">
        <div className="text-lg text-white font-bold">
          Character information is missing
        </div>
      </div>
    );
  }
  const page = Number(pageId ?? '1');

  return (
    <Link to={`/${page}/${characterInfo.id}`}>
      <div
        className="flex flex-col gap-2 bg-blue-500 rounded-3xl pt-4 px-2 sm:p-6 w-32 h-48 sm:w-48 sm:h-64 pb-0 sm:pb-0"
        data-testid="character-card"
        role="character-card"
      >
        <img
          src={characterInfo?.image}
          className="rounded-3xl w-24 h-24 mx-auto sm:w-32 sm:h-32"
          alt="Character portrait"
        />
        <div className="text-xs text-white sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
          {characterInfo?.name}
        </div>
      </div>
    </Link>
  );
}
