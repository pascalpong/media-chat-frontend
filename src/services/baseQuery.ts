// baseQuery.ts
import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_MEDIA_CHAT_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl ? `${baseUrl}` : '',
});
