import { BaseSchema, FORM_FIELDS } from '@/utils/validation';
import { BUTTON_STYLE } from '@app/constants';
import type { RootState } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

type FormValues = z.infer<typeof BaseSchema>;

interface Props {
  onSuccess: () => void;
}

export default function RHFForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(BaseSchema),
    mode: 'onChange',
  });

  const countriesList = useSelector((state: RootState) => state.countries);

  const onSubmit = (data: FormValues) => {
    console.log('RHF submit:', data);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e))}
      className="flex flex-col gap-3"
    >
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
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className="border p-2 rounded w-full"
                />
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name]?.message ?? '\u00A0'}
                </p>
              </div>
            );

          case 'checkbox':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register(field.name)} />
                  {field.label}
                </label>
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name]?.message ?? '\u00A0'}
                </p>
              </div>
            );

          case 'radio':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <p>{field.label}</p>
                {field.options?.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={opt.value}
                      {...register(field.name)}
                    />
                    {opt.label}
                  </label>
                ))}
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name]?.message ?? '\u00A0'}
                </p>
              </div>
            );

          case 'select':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label htmlFor={field.name}>{field.label}</label>
                <select
                  id={field.name}
                  {...register(field.name)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select...</option>
                  {countriesList.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name]?.message ?? '\u00A0'}
                </p>
              </div>
            );

          case 'file':
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register(field.name)}
                  className="border p-2 rounded"
                />
                <p className="text-sm text-red-500 h-5 p-1 break-words whitespace-normal">
                  {errors[field.name]?.message ?? '\u00A0'}
                </p>
              </div>
            );

          default:
            return null;
        }
      })}

      <button type="submit" className={BUTTON_STYLE} disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
