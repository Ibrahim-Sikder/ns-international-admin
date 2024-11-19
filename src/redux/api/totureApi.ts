import { baseApi } from "./baseApi";

const tortureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTorture: builder.mutation({
      query: (data) => ({
        url: "/torture",
        method: "POST",
        data,
      }),
      invalidatesTags: ["torture"],
    }),

    deleteTorture: builder.mutation({
      query: (id) => ({
        url: `/torture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["torture"],
    }),
    getAllTorture: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/torture",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["torture"],
    }),
    getSingleTorture: builder.query({
      query: (id) => ({
        url: `/torture/${id}`,
        method: "GET",
      }),
      providesTags: ["torture"],
    }),
    updateTorture: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/torture/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["torture"],
    }),
  }),
});

export const {
  useGetAllTortureQuery,
  useCreateTortureMutation,
  useDeleteTortureMutation,
  useGetSingleTortureQuery,
  useUpdateTortureMutation,
} = tortureApi;
