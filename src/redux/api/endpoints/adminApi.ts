import { baseApi } from '../baseApi';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardInfo: builder.query<any, void>({
      query: () => '/loadAdminDashboardValues',
      providesTags: ['Dashboard', 'User', 'Feedback'],
    }),
    getAllUsers: builder.query<any, void>({
      query: () => '/allUsers',
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: '/deleteUser',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['User', 'Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardInfoQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = adminApi;
