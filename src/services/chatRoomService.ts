// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const ChatRoomService = createApi({
  reducerPath: 'ChatRoomService',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getChatMessages: builder.query<any, {roomId: string, page: number}>({
      query: ({roomId, page}) => ({
        url: `/chat-room/${roomId}/message`,
        method: "GET",
        params: { page }
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetChatMessagesQuery } = ChatRoomService
