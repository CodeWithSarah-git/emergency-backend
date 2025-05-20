import { apiSlice } from '../../app/apiSlice';

 export const notificationApi= apiSlice.injectEndpoint({
     endpoints: (builder) => ({
    getNotificationsByVolunteer: builder.query({
      query: (volunteerId) => `Notification/volunteer/${volunteerId}`,
      providesTags: ['Notification'],
    }),
    addNotification:builder.mutation({
        query:(newNotification)=>({
            url:'Notification',
            method:"POST",
            body:newNotification
        }),
        invalidatesTags: ['Notification']
    }),
     updateNotification: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `Notification/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Notification'],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `Notification/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
  });
    export const {
  useGetNotificationsByVolunteerQuery,
  useAddNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
