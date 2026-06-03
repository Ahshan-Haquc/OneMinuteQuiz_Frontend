import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Auth', 'User', 'Feedback', 'Dashboard', 'Quiz'],
  endpoints: () => ({}),
});
