export interface Country {
  name: string;
  code: string;
}

export type Gender = 'female' | 'male' | 'other';

export interface Submission {
  id: string;
  source: 'uncontrolled' | 'rhf';
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  acceptedTnC: boolean;
  imageBase64: string | null;
  country: string;
  createdAt: number;
}
