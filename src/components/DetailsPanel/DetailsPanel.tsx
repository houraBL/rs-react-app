import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CharacterInfo } from '../../types/character';
import { fetchCharacterDetails } from '../../api/character-details';
import MainLoader from '../MainLoader/MainLoader';

export default function DetailsPanel() {
  const { detailsId, page } = useParams();
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

      if (clickedOutsidePanel && !clickedCard) {
        navigate(`/${page ?? ''}`, { replace: true });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate, page]);

  const detailsClassName =
    'm-4 p-4 px-6 w-full h-fit bg-blue-500 rounded-3xl flex flex-col gap-2';

  if (!detailsId) return null;
  if (loading)
    return (
      <div
        className={
          detailsClassName + ' flex-grow flex items-center justify-center'
        }
        ref={panelRef}
      >
        <MainLoader color="bg-white" />
      </div>
    );
  if (!character)
    return (
      <div className={detailsClassName} ref={panelRef}>
        Character not found
      </div>
    );
  if (error) {
    return (
      <div className={detailsClassName} ref={panelRef}>
        Error: {error}
      </div>
    );
  }
  return (
    <div className={detailsClassName} ref={panelRef}>
      <h2 className="text-xl font-bold">{character.name}</h2>
      <img
        src={character?.image}
        className="rounded-3xl"
        alt={character?.name}
      />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin?.name}</p>
    </div>
  );
}
