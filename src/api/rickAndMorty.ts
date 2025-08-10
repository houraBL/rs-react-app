import type { CharacterInfo } from '@/types/characterInfo';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const rickAndMortyAPI = createApi({
  reducerPath: 'rickAndMortyAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCharacterById: build.query<CharacterInfo, string>({
      query: (id) => `character/${id}`,
    }),
    getCharactersByName: build.query<Response, { name: string; page: number }>({
      query: ({ name, page }: { name: string; page: number }) =>
        `character/?name=${name.trim()}&page=${page.toString()}`,
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersByNameQuery } =
  rickAndMortyAPI;

type Response = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterInfo[];
};
