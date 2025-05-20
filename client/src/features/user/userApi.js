import { apiSlice } from '../../app/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //קבלת כל המשתמשים
    getUsers: builder.query({
      query: () => 'Users',
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: (id) => `Users/${id}`,
      providesTags: ['User']
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'Users',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `Users/${id}`,
        method: 'PUT',
        body: updatedUser
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `Users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;