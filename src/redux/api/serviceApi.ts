import { baseApi } from "./baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        data,
      }),
      invalidatesTags: ["services"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
    getAllService: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/services",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["services"],
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["services"],
    }),

    //serviceCategories route 
    creatServiceCategories: builder.mutation({
      query: (data) => ({
        url: "/services/categories",
        method: "POST",
        data,
      }),
      invalidatesTags: ["services"],
    }),

    deleteServiceCategories: builder.mutation({
      query: (id) => ({
        url: `/services/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
    getAllServiceCategories: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/services/categories",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["services"],
    }),
  }),
});

export const {
  useGetAllServiceQuery,
  useCreatServiceMutation,
  useDeleteServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useCreatServiceCategoriesMutation,
  useDeleteServiceCategoriesMutation,
  useGetAllServiceCategoriesQuery
} = serviceApi;
