import type { Submission } from '@app/types';

export default function SubmittedCard({
  submission,
  selected,
}: {
  submission: Submission;
  selected: string | null;
}) {
  const isSelected = selected === submission.id;
  console.log(isSelected, submission.name);
  return (
    <div
      className={`relative flex flex-col gap-2 bg-blue-100 dark:bg-blue-600 rounded-3xl w-32 h-48 sm:w-48 sm:h-64
        ${isSelected ? 'border-4 border-emerald-400' : ''}`}
      data-testid="character-card"
      role="character-card"
    >
      <div className="flex flex-col gap-2 w-full h-full pt-4 px-2 sm:p-6 pb-0 sm:pb-0">
        <div className="text-xs sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
          {submission.name}
        </div>
        <div className="text-xs sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
          {submission.age}
        </div>
        <div className="text-xs sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
          {submission.gender}
        </div>
        <div className="text-xs sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
          {submission.email}
        </div>
        <div className="text-xs sm:font-bold sm:text-base overflow-hidden h-16 sm:h-full">
          {submission.country}
        </div>
      </div>
    </div>
  );
}
