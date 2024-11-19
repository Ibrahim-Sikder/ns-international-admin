import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatAbout: builder.mutation({
      query: (data) => ({
        url: "/about",
        method: "POST",
        data,
      }),
      invalidatesTags: ["about"],
    }),

    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `/about/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["about"],
    }),
    getAllAbout: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/about",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["about"],
    }),
    getSingleAbout: builder.query({
      query: (id) => ({
        url: `/about/${id}`,
        method: "GET",
      }),
      providesTags: ["about"],
    }),
    updateAbout: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/about/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const {
  useGetAllAboutQuery,
  useCreatAboutMutation,
  useDeleteAboutMutation,
  useGetSingleAboutQuery,
  useUpdateAboutMutation,
} = productApi;
