import { apiSlice } from '../../api/apiSlice';

 export const notificationApi= apiSlice.injectEndpoints({
     endpoints: (builder) => ({
     getNotifications: builder.query({
      query: () => `Notification`, 
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
  useGetNotificationsQuery,
  useAddNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
