import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    prepareHeaders: (headers) => {
      // Add any global headers here if needed.
      // E.g., if token was stored in local storage instead of cookies.
      return headers;
    },
  }),
  tagTypes: ['Auth', 'User', 'Feedback', 'Dashboard'],
  endpoints: () => ({}),
});
