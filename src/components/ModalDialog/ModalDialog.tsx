import { type ReactNode, useEffect, useRef } from 'react';

type ModalDialogProps = {
  title: string;
  children: ReactNode;
  closeModal: () => void;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

export default function ModalDialog({
  title,
  children,
  closeModal,
}: ModalDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const lastFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    lastFocusedElement.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      if (lastFocusedElement.current instanceof HTMLElement) {
        lastFocusedElement.current.focus();
      }
    };
  }, [closeModal]);
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  return (
    <div
      className="fixed backdrop-blur-[2px] inset-0 backdrop-brightness-[.7] flex items-center justify-center z-40"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="relative rounded-3xl shadow-3xl p-6 w-[90%] max-w-md max-h-[95%] overflow-y-auto flex flex-col gap-4 items-center text-center text-blue-900 bg-blue-100 dark:bg-blue-800 dark:text-white z-50">
        <button
          type="button"
          onClick={closeModal}
          className={
            'w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer rounded-full absolute -right-2 -top-2 z-60 ' +
            'text-white bg-blue-400 hover:bg-blue-500 dark:text-blue-900 dark:bg-blue-400 dark:hover:bg-blue-500'
          }
          aria-label="Close details"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
