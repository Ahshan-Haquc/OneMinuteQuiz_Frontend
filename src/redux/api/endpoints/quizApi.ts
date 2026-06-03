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
        updateTopThreeHighestScores: builder.mutation<any, { gameName: string, score: number }>({
            query: ({ gameName, score }) => ({
                url: `/quiz/updateHighestScore/${gameName}`,
                method: "PATCH",
                body: { score },
            }),
            invalidatesTags: ['Quiz'],
        }),
        updateRatingOfSpecificGame: builder.mutation<any, { gameName: string, rating: number }>({
            query: ({ gameName, rating }) => ({
                url: `/quiz/updateRating/${gameName}`,
                method: "PATCH",
                body: { rating },
            }),
            invalidatesTags: ['Quiz'],
        }),
        updateTotalPlayCount: builder.mutation<any, { gameName: string }>({
            query: ({ gameName }) => ({
                url: `/quiz/updateTotalPlayCount/${gameName}`,
                method: "PATCH",
            }),
            invalidatesTags: ['Quiz'],
        }),
    }),
});

export const {
    useGetLandingPageDataQuery,
    useGetTopThreeHighestScoresQuery,
    useUpdateTopThreeHighestScoresMutation,
    useUpdateRatingOfSpecificGameMutation,
    useUpdateTotalPlayCountMutation,
} = quizApi;
