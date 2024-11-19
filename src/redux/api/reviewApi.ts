import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatReview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        data,
      }),
      invalidatesTags: ["review"],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    getAllReview: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/review",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["review"],
    }),
    getSingleReview: builder.query({
      query: (id) => ({
        url: `/review/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useCreatReviewMutation,
  useDeleteReviewMutation,
  useGetSingleReviewQuery,
  useUpdateReviewMutation,
} = reviewApi;
