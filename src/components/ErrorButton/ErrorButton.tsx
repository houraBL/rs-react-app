import { useState } from 'react';

export default function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Manual Error!');
  }

  return (
    <button
      className="px-4 rounded-full h-10 bg-red-400 dark:bg-red-600 hover:cursor-pointer text-lg font-bold fixed z-50 bottom-16 right-4"
      onClick={() => setShouldThrow(true)}
    >
      Create error
    </button>
  );
}
