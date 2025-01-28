import { baseAPI } from "@/services/baseApi";
import { USER_CATEGORY, USER_ROLES, USERS } from "../tagTypes";

export const usersAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<{ id: string; name: string }, void>({
      query: () => "/users/getAllUsers",
      providesTags: [USERS],
    }),
    getUserCategories: build.query<string[], void>({
      query: () => "/users/fetchCategories",
      providesTags: [USER_CATEGORY],
    }),
    getUserRoles: build.query<string[], void>({
      query: () => "/users/fetchRoles",
      providesTags: [USER_ROLES],
    }),
    getUserDetails: build.query<string[], void>({
      query: (id) => `/users/getUserDetails/${id}`,
      providesTags: [USER_ROLES],
    }),
    registerUser: build.mutation<void, Record<string, any>>({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [USERS],
    }),
    createUserCategory: build.mutation<void, Record<string, any>>({
      query: (category) => ({
        url: "/users/createCategory",
        method: "POST",
        body: category,
      }),
      invalidatesTags: [USER_CATEGORY],
    }),
    createUserProfile: build.mutation<void, Record<string, any>>({
      query: (body) => ({
        url: "/users/createUserProfile",
        method: "POST",
        body,
      }),
      invalidatesTags: [USERS],
    }),
    inviteSubUsers: build.mutation<void, Record<string, any>>({
      query: (body) => ({
        url: "/users/inviteSubUser",
        method: "POST",
        body,
      }),
      invalidatesTags: [USERS],
    }),
    moveSelectedUsers: build.mutation<void, Record<string, any>>({
      query: (body) => ({
        url: "/users/moveSelected",
        method: "POST",
        body,
      }),
      invalidatesTags: [USERS],
    }),
    sendBulkEmail: build.mutation<void, Record<string, any>>({
      query: (body) => ({
        url: "/users/bulkEmail",
        method: "POST",
        body,
      }),
      invalidatesTags: [USERS],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserRolesQuery,
  useGetUserCategoriesQuery,
  useGetUserDetailsQuery,
  useRegisterUserMutation,
  useSendBulkEmailMutation,
  useMoveSelectedUsersMutation,
  useInviteSubUsersMutation,
  useCreateUserCategoryMutation,
  useCreateUserProfileMutation,
} = usersAPI;
