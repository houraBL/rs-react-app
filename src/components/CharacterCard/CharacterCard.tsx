import type { CharacterInfo } from '@/types/characterInfo';
import type { RootState } from '@app/store';
import { toggleItem } from '@store/selectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function CharacterCard({
  characterInfo,
}: {
  characterInfo?: CharacterInfo;
}) {
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );

  if (!characterInfo) {
    return (
      <div className="flex items-center justify-center bg-blue-500 rounded-3xl p-6 w-48 h-64">
        <div className="text-lg font-bold">
          Character information is missing
        </div>
      </div>
    );
  }
  const page = Number(pageId ?? '1');
  const handleCheckboxChange = () => {
    dispatch(toggleItem(characterInfo));
  };

  return (
    <div
      className="relative flex flex-col gap-2 bg-blue-100 dark:bg-blue-600 rounded-3xl w-32 h-48 sm:w-48 sm:h-64"
      data-testid="character-card"
      role="character-card"
    >
      <input
        role="selection-checkbox"
        type="checkbox"
        checked={selectedItems.some((item) => item.id === characterInfo.id)}
        onChange={handleCheckboxChange}
        className="absolute top-0 right-0 sm:top-4 sm:right-4 w-4 h-4 hover:cursor-pointer border-blue-300 rounded-sm focus:ring-white focus:ring-2"
      />
      <Link to={`/${page}/${characterInfo.id}`}>
        <div className="flex flex-col gap-2 w-full h-full pt-4 px-2 sm:p-6 pb-0 sm:pb-0">
          <img
            src={characterInfo?.image}
            className="rounded-3xl w-24 h-24 mx-auto sm:w-32 sm:h-32"
            alt="Character portrait"
          />
          <div className="text-xs sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
            {characterInfo?.name}
          </div>
        </div>
      </Link>
    </div>
  );
}
