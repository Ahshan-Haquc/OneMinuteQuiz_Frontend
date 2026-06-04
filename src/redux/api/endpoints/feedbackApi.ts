import { baseApi } from '../baseApi';

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<any, any>({
      query: ({page}) => `/feedback/getAllFeedback/${page}`,
      providesTags: ['Feedback'],
    }),
    submitFeedback: builder.mutation<any, any>({
      query: (feedbackData) => ({
        url: '/feedback/sentFeedback',
        method: 'POST',
        body: feedbackData,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation<any, string>({
      query: (id) => ({
        url: '/feedback/deleteAllFeedback',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useSubmitFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
