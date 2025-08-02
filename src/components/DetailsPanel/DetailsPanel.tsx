import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CharacterInfo } from '../../types/character';
import { fetchCharacterDetails } from '../../api/character-details';
import MainLoader from '../MainLoader/MainLoader';

export default function DetailsPanel() {
  const { detailsId, pageId } = useParams();
  const [character, setCharacter] = useState<CharacterInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;
    if (!detailsId) {
      setCharacter(null);
      return;
    }
    const loadCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const { result } = await fetchCharacterDetails(detailsId);
        if (!isCancelled) {
          setCharacter(result);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const message =
            err instanceof Error ? err.message : 'Unknown error occurred';
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => {
      isCancelled = true;
    };
  }, [detailsId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const clickedOutsidePanel =
        panelRef.current && !panelRef.current.contains(target);

      const clickedCard = target.closest('[role="character-card"]');
      const clickedPagination = target.closest('[data-role="pagination"]');
      if (clickedPagination) {
        return;
      }

      if (clickedOutsidePanel && !clickedCard) {
        navigate(`/${pageId ?? ''}`, { replace: true });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate, pageId]);

  const detailsClassName =
    'relative sticky top-20 my-4 mx-2 sm:mx-6 p-4 px-4 sm:px-6 h-fit bg-blue-500 rounded-3xl flex flex-col gap-2 min-w-40 w-60 sm:min-w-60';

  if (!detailsId) return null;
  if (loading)
    return (
      <div
        className={detailsClassName + ' items-center justify-center'}
        ref={panelRef}
      >
        <MainLoader color="bg-white" />
      </div>
    );

  if (error) {
    return (
      <div className={detailsClassName} ref={panelRef}>
        Error: {error}
      </div>
    );
  }

  if (!character)
    return (
      <div className={detailsClassName} ref={panelRef}>
        Character not found
      </div>
    );

  return (
    <div className={detailsClassName} ref={panelRef}>
      <button
        type="button"
        onClick={() => navigate(`/${pageId ?? ''}`, { replace: true })}
        className="w-6 h-6 flex items-center justify-center text-blue-400 text-xl font-bold cursor-pointer rounded-full bg-blue-100 hover:bg-blue-200 transition absolute -right-1.5 -top-1.5"
        aria-label="Close details"
      >
        ✕
      </button>
      <h2 className="text-sm sm:text-xl font-bold">{character.name}</h2>
      <img
        src={character?.image}
        className="rounded-3xl"
        alt={character?.name}
      />
      <p className="text-sm sm:text-lg">Status: {character.status}</p>
      <p className="text-sm sm:text-lg">Species: {character.species}</p>
      <p className="text-sm sm:text-lg">Gender: {character.gender}</p>
      <p className="text-sm sm:text-lg">Origin: {character.origin?.name}</p>
    </div>
  );
}
