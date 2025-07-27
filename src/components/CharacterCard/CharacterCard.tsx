import type { CharacterInfo } from '../../types/character';

export default function CharacterCard({
  characterInfo,
}: {
  characterInfo?: CharacterInfo;
}) {
  if (!characterInfo) {
    return (
      <div className="flex items-center justify-center bg-blue-500 rounded-3xl p-6 w-48 h-64">
        <div className="text-lg text-white font-bold">
          Character information is missing
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex flex-col gap-2 bg-blue-500 rounded-3xl p-6 w-48 h-64"
      data-testid="character-card"
    >
      <img
        src={characterInfo?.image}
        className="rounded-3xl"
        alt="Character portrait"
      />
      <div className="text-lg text-white font-bold">{characterInfo?.name}</div>
    </div>
  );
}
