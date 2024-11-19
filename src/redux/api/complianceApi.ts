import { baseApi } from "./baseApi";

const complianceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatcompliance: builder.mutation({
      query: (data) => ({
        url: "/compliance",
        method: "POST",
        data,
      }),
      invalidatesTags: ["compliance"],
    }),

    
    deletecompliance: builder.mutation({
      query: (id) => ({
        url: `/compliance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["compliance"],
    }),
    getAllcompliance: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/compliance",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["compliance"],
    }),
    getSinglecompliance: builder.query({
      query: (id) => ({
        url: `/compliance/${id}`,
        method: "GET",
      }),
      providesTags: ["compliance"],
    }),
    updatecompliance: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/compliance/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["compliance"],
    }),
  }),
});

export const {
  useGetAllcomplianceQuery,
  useCreatcomplianceMutation,
  useDeletecomplianceMutation,
  useGetSinglecomplianceQuery,
  useUpdatecomplianceMutation,
} = complianceApi;
