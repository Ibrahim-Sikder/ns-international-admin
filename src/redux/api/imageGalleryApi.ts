import { baseApi } from "./baseApi";

const photoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPhoto: builder.mutation({
      query: (data) => ({
        url: "/image-gallery",
        method: "POST",
        data,
      }),
      invalidatesTags: ["gallery"],
    }),

    deletePhoto: builder.mutation({
      query: (id) => ({
        url: `/image-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
    getAllPhoto: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/image-gallery",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["gallery"],
    }),
    getSinglePhoto: builder.query({
      query: (id) => ({
        url: `/image-gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["gallery"],
    }),
    updatePhoto: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/image-gallery/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetAllPhotoQuery,
  useCreatePhotoMutation,
  useDeletePhotoMutation,
  useGetSinglePhotoQuery,
  useUpdatePhotoMutation,
} = photoGalleryApi;
