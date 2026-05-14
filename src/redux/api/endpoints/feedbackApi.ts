import { baseApi } from '../baseApi';

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<any, void>({
      query: () => '/getFeedback',
      providesTags: ['Feedback'],
    }),
    submitFeedback: builder.mutation<any, any>({
      query: (feedbackData) => ({
        url: '/feedback',
        method: 'POST',
        body: feedbackData,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation<any, string>({
      query: (id) => ({
        url: '/deleteFeedback',
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
