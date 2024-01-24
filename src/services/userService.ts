// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const UserService = createApi({
  reducerPath: 'UserService',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<any, string>({
      query: (name) => `/user`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery } = UserService
