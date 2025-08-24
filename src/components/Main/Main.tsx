import { BUTTON_STYLE } from '@app/constants';
import image_choice from '@assets/whatever.png';
import ModalDialog from '@components/ModalDialog';
import RHFForm from '@components/RHFForm';
import SubmittedList from '@components/SubmittedList';
import UncontrolledForm from '@components/UncontrolledForm';
import { useState } from 'react';

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<'uncontrolled' | 'rhf' | null>(null);

  return (
    <div className="flex flex-col bg-blue-100 p-6 m-2 rounded-3xl gap-4  justify-center items-center">
      <div className="flex flex-col gap-4 w-fit">
        <img src={image_choice} />
        <h2>
          OMG look! You can select which form to fill! (they are the same form)
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <button
            className={BUTTON_STYLE}
            onClick={() => {
              setFormType('uncontrolled');
              setIsModalOpen(true);
            }}
          >
            Uncontrolled Form
          </button>
          <button
            className={BUTTON_STYLE}
            onClick={() => {
              setFormType('rhf');
              setIsModalOpen(true);
            }}
          >
            React Hook Form
          </button>
        </div>
      </div>

      <SubmittedList />

      {isModalOpen && formType && (
        <ModalDialog
          title={
            formType === 'uncontrolled'
              ? 'Uncontrolled Form'
              : 'React Hook Form'
          }
          closeModal={() => setIsModalOpen(false)}
        >
          {formType === 'uncontrolled' ? (
            <UncontrolledForm onSuccess={() => setIsModalOpen(false)} />
          ) : (
            <RHFForm onSuccess={() => setIsModalOpen(false)} />
          )}
        </ModalDialog>
      )}
    </div>
  );
}
