import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "./baseQuery";

export const AuthenticationService = createApi({
    reducerPath: 'AuthenticationService',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (body) => ({
                url: `/auth/login`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const { useLoginMutation } = AuthenticationService