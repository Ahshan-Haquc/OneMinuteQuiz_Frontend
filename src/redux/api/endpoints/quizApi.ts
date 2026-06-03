import { baseApi } from '../baseApi';

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingPageData: builder.query<any, void>({
      query: () => '/quiz/getLandingPageData',
      providesTags: ['Quiz'],
    }),
    getTopThreeHighestScores: builder.query<any, string>({
      query: (gameName: string) => `/quiz/getTopThreeHighestScores/${gameName}`,
      providesTags: ['Quiz'],
    }),
    updateTopThreeHighestScores: builder.mutation<any, string>({
      query: ({gameName: string, score: number}) => `/quiz/updateTopThreeHighestScores/${gameName}/${score}`,
      invalidatesTags: ['Quiz'],
    }),
  }),
});

export const {
  useGetLandingPageDataQuery,
  useGetTopThreeHighestScoresQuery,
} = quizApi;
