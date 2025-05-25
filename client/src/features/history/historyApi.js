import { apiSlice } from '../../api/apiSlice';

export const historyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // קבלת כל ההיסטוריה
    getHistories: builder.query({
      query: () => 'CallHistory',
      providesTags: ['History'], 
    }),

    // הוספת רשומת היסטוריה חדשה
    addHistory: builder.mutation({
      query: (newHistory) => ({
        url: 'CallHistory',
        method: 'POST',
        body: newHistory,
      }),
      invalidatesTags: ['History'],
    }),

    // קבלת היסטוריה לפי מתנדב
    getHistoryByVolunteer: builder.query({
      query: (volunteerId) => `CallHistory/volunteer/${volunteerId}`,
      providesTags: ['History'],
    }),

    // קבלת היסטוריה לפי קריאה
    getHistoryByEmergency: builder.query({
      query: (emergencyId) => `CallHistory/emergency/${emergencyId}`,
      providesTags: ['History'],
    }),
  }),
});

export const {
  useGetHistoriesQuery,
  useAddHistoryMutation,
  useGetHistoryByVolunteerQuery,
  useGetHistoryByEmergencyQuery,
} = historyApi;