import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatlBrand: builder.mutation({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        data,
      }),
      invalidatesTags: ["brands"],
    }),

    deletlBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands"],
    }),
    getAllBrand: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/brands",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["brands"],
    }),
    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: ["brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useGetAllBrandQuery,
  useCreatlBrandMutation,
  useDeletlBrandMutation,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
} = brandApi;
