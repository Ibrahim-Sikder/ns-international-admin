import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        data,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getAllProduct: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/products",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["products"],
    }),
    //serviceCategories route
    creatProductCategories: builder.mutation({
      query: (data) => ({
        url: "/products/categories",
        method: "POST",
        data,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProductCategories: builder.mutation({
      query: (id) => ({
        url: `/products/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getAllProductCategories: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/products/categories",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreatProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useCreatProductCategoriesMutation,
  useDeleteProductCategoriesMutation,
  useGetAllProductCategoriesQuery,
} = productApi;

