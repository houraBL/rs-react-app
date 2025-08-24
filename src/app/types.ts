export interface Country {
  name: string;
  code: string;
}

export type Gender = 'female' | 'male' | 'other';

export interface Submission {
  id: string;
  source: 'uncontrolled' | 'rhf';
  name: string;
  age: string;
  email: string;
  password: string;
  gender: Gender;
  acceptedTnC: boolean;
  country: string;
  createdAt: number;
}
