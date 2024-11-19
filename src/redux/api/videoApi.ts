import { baseApi } from "./baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVideo: builder.mutation({
      query: (data) => ({
        url: "/video",
        method: "POST",
        data,
      }),
      invalidatesTags: ["video"],
    }),


    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video"],
    }),
    getAllVideo: builder.query({
      query: () => ({
        url: "/video",
        method: "GET",
      }),
      providesTags: ["video"],
    }),
    getSingleVideo: builder.query({
      query: (id) => ({
        url: `/video/${id}`,
        method: "GET",
      }),
      providesTags: ["video"],
    }),
    updateVideo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/video/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags:['video']
    }),
  }),
});

export const {
  useGetAllVideoQuery,
  useCreateVideoMutation,
  useDeleteVideoMutation,
  useGetSingleVideoQuery,
  useUpdateVideoMutation,
} = videoApi;
