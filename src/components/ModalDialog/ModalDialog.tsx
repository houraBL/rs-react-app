import { BUTTON_STYLE } from '@components/Main/Main';
import { useEffect } from 'react';

type ModalDialogProps = {
  title: string;
  message: React.ReactNode;
  buttonText: string;
  closeModal: () => void;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

export default function ModalDialog({
  title,
  message,
  buttonText,
  closeModal,
}: ModalDialogProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  return (
    <div
      className="fixed backdrop-blur-[2px] inset-0 backdrop-brightness-[.7] flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="rounded-3xl shadow-2xl p-6 w-[90%] max-w-md flex flex-col gap-4 items-center text-center text-blue-900 bg-blue-100 dark:bg-blue-800 dark:text-white">
        <h2 className="text-2xl font-bold text-goldenrod font-additional">
          {title}
        </h2>
        <p className="font-main text-lg text-olive pt-4 pb-4">{message}</p>
        <button onClick={closeModal} className={BUTTON_STYLE}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
