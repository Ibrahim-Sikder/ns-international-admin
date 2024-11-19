import { baseApi } from "./baseApi";

const whoweareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWhoWeAre: builder.mutation({
      query: (data) => ({
        url: "/whoweare",
        method: "POST",
        data,
      }),
      invalidatesTags: ["whoweare"],
    }),

    deleteWhoweare: builder.mutation({
      query: (id) => ({
        url: `/whoweare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whoweare"],
    }),
    getAllWhoWwAre: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/whoweare",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["whoweare"],
    }),
    getSingleWhoweare: builder.query({
      query: (id) => ({
        url: `/whoweare/${id}`,
        method: "GET",
      }),
      providesTags: ["whoweare"],
    }),
    updateWhoweare: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/whoweare/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["whoweare"],
    }),
  }),
});

export const {
useCreateWhoWeAreMutation,
useGetAllWhoWwAreQuery,
useGetSingleWhoweareQuery,
useDeleteWhoweareMutation,
useUpdateWhoweareMutation,
} = whoweareApi;
