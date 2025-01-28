import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_CATEGORY, USER_ROLES, USERS } from "./tagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    try {
      // Retrieve the __session cookie from document.cookie on the client-side
      const cookies = document.cookie
        .split("; ")
        .find(row => row.startsWith("__session="))
        ?.split("=")[1];

      if (cookies) {
        headers.set("Authorization", `Bearer ${cookies}`);
      }
    } catch (error) {
      console.error("Error fetching token from __session cookie:", error);
    }

    return headers;
  },
});

// Define the base API
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery,
  tagTypes: [USERS,USER_CATEGORY,USER_ROLES],
  endpoints: () => ({}),
});

export default baseAPI;
