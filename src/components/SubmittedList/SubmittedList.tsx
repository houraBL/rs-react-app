import type { RootState } from '@app/store';
import SubmittedCard from '@components/SubmittedCard';
import { useSelector } from 'react-redux';

export default function SubmittedList() {
  const submissions = useSelector((state: RootState) => state.submissions);
  const selectedItemId = useSelector(
    (state: RootState) => state.submissions.lastAddedId
  );
  const containerClassName =
    'flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center mx-auto';

  if (submissions.items.length === 0) {
    return (
      <div className={containerClassName}>Please submit a form or smth</div>
    );
  }

  return (
    <div
      className="flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center "
      aria-label="characters-cards-container"
    >
      {submissions.items &&
        submissions.items.map((submission) => (
          <SubmittedCard
            key={submission.id}
            submission={submission}
            selected={selectedItemId}
          />
        ))}
    </div>
  );
}
