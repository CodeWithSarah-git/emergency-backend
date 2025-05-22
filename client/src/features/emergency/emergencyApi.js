import { apiSlice } from '../../api/apiSlice';

export const emergencyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmergencies: builder.query({
      query: () => 'Emergency',
      providesTags: ['Emergency'],
    }),
    getEmergencyById: builder.query({
      query: (id) => `Emergency/${id}`,
      providesTags: ['Emergency'],
    }),
    addEmergency: builder.mutation({
      query: (newCall) => ({
        url: 'Emergency',
        method: 'POST',
        body: newCall,
      }),
      invalidatesTags: ['Emergency'],
    }),
    updateEmergency: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `Emergency/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Emergency'],
    }),
    deleteEmergency: builder.mutation({
      query: (id) => ({
        url: `Emergency/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Emergency'],
    }),
  }),
});

export const {
  useGetEmergenciesQuery,
  useGetEmergencyByIdQuery,
  useAddEmergencyMutation,
  useUpdateEmergencyMutation,
  useDeleteEmergencyMutation,
} = emergencyApi;
