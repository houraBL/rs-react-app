import ModalDialog from '@components/ModalDialog';
import { useState } from 'react';

export const BUTTON_STYLE =
  'px-4 py-2 rounded-3xl hover:cursor-pointer disabled:cursor-default disabled:bg-blue-200 text-blue-900 bg-blue-300 hover:bg-blue-500 dark:disabled:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white';

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');

  return (
    <div>
      <button
        className={BUTTON_STYLE}
        onClick={() => {
          setContent('Modal 1');
          setIsModalOpen(true);
        }}
      >
        Modal 1
      </button>
      <button
        className={BUTTON_STYLE}
        onClick={() => {
          setContent('Modal 2');
          setIsModalOpen(true);
        }}
      >
        Modal 2
      </button>
      {isModalOpen && (
        <ModalDialog
          title={content}
          message={undefined}
          buttonText={'YEY'}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
