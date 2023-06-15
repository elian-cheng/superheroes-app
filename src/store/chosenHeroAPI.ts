import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'API/URL';
import { IHero } from './heroSlice';

export const chosenHeroAPI = createApi({
  reducerPath: 'chosenHeroAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}heroes/` }),
  endpoints: (build) => ({
    getDetailedHero: build.query<IHero, string>({
      query: (id: string) => ({
        url: id,
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useGetDetailedHeroQuery } = chosenHeroAPI;
