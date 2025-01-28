import baseAPI from "../baseApi";

export const uploadAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: (file) => ({
        url: "/uploads/file",
        method: "POST",
        body: file,
      }),
    }),
  }),
});
export const { useUploadFileMutation } = uploadAPI;
