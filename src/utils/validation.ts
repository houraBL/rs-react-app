import { z } from 'zod';

import type { Gender } from '../app/types';

const nameRegex = /^[A-Z][A-Za-z\s'-]*$/;

export const BaseSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Required')
      .regex(nameRegex, 'Start with uppercase letter'),
    age: z
      .string()
      .regex(/^[0-9]/, 'Please enter a valid age value (ex. 32)')
      .refine((val) => {
        const age = Number(val);
        return age >= 13;
      }, 'You must be at least 13 years old')
      .refine((val) => {
        const age = Number(val);
        return age <= 120;
      }, 'Please enter valid age value'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/\d/, 'Need a number')
      .regex(/[A-Z]/, 'Need an uppercase letter')
      .regex(/[a-z]/, 'Need a lowercase letter')
      .regex(/[^A-Za-z0-9]/, 'Need a special character'),
    confirmPassword: z.string(),
    gender: z.custom<Gender>(
      (val) => val === 'female' || val === 'male' || val === 'other',
      {
        message: 'Select gender',
      }
    ),
    acceptedTnC: z.boolean().refine((val) => val === true, {
      message: 'You must accept T&C',
    }),
    country: z.string().min(1, 'Select a country'),

    imageBase64: z
      .union([
        z
          .string()
          .startsWith('data:image/', 'Invalid image')
          .refine(
            (v) =>
              v.startsWith('data:image/png') || v.startsWith('data:image/jpeg'),
            'Only PNG/JPEG allowed'
          ),
        z.undefined(),
      ])
      .transform((v) => (v === '' ? undefined : v)),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type BaseFormValues = z.infer<typeof BaseSchema>;

type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'file';

type FormField = {
  name: keyof BaseFormValues;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export const FORM_FIELDS: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
  { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm password',
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  { name: 'acceptedTnC', label: 'Accept Terms & Conditions', type: 'checkbox' },
  { name: 'country', label: 'Country', type: 'select' },
  { name: 'imageBase64', label: 'Profile Picture', type: 'file' },
];
