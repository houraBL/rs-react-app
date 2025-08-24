import {
  type BaseFormValues,
  BaseSchema,
  FORM_FIELDS,
} from '@/utils/validation';
import { BUTTON_STYLE } from '@app/constants';
import type { RootState } from '@app/store';
import { addSubmission, clearHighlight } from '@features/submissionsSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UncontrolledForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const countriesList = useSelector((state: RootState) => state.countries);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BaseFormValues, string>>
  >({});

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = Object.fromEntries(formData.entries());

    const parsedValues = {
      ...values,
      acceptedTnC: formData.get('acceptedTnC') === 'on',
    };

    const result = BaseSchema.safeParse(parsedValues);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BaseFormValues, string>> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof BaseFormValues;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    console.log('Uncontrolled submit:', result.data);
    setErrors({});
    dispatch(clearHighlight());
    dispatch(
      addSubmission({
        ...result.data,
        source: 'uncontrolled',
      })
    );
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {FORM_FIELDS.map((field) => {
        switch (field.type) {
          case 'text':
          case 'number':
          case 'email':
          case 'password':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="border p-2 rounded w-full"
                />
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name] ?? '\u00A0'}
                </p>
              </div>
            );

          case 'checkbox':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name={field.name} />
                  {field.label}
                </label>
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name] ?? '\u00A0'}
                </p>
              </div>
            );

          case 'radio':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <p>{field.label}</p>
                {field.options?.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <input type="radio" value={opt.value} name={field.name} />
                    {opt.label}
                  </label>
                ))}
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name] ?? '\u00A0'}
                </p>
              </div>
            );

          case 'select':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label htmlFor={field.name}>{field.label}</label>
                <select
                  id={field.name}
                  className="border p-2 rounded w-full"
                  name={field.name}
                >
                  <option value="">Select...</option>
                  {countriesList.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name] ?? '\u00A0'}
                </p>
              </div>
            );

          default:
            return null;
        }
      })}

      <button type="submit" className={BUTTON_STYLE}>
        Submit
      </button>
    </form>
  );
}
