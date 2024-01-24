import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "./baseQuery";


export const MessageService = createApi({
    reducerPath: 'MessageService',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        sendMessage: builder.mutation<any, any>({
            query: ({roomId, body}) => ({
                url: `/chat-room/${roomId}/message`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const { useSendMessageMutation } = MessageService