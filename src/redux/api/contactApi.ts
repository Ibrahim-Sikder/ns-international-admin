import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
    getAllContact: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/contact",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useGetAllContactQuery, useDeleteContactMutation } = contactApi;
