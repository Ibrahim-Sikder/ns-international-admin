import { baseApi } from "./baseApi";

const missionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatMission: builder.mutation({
      query: (data) => ({
        url: "/mission",
        method: "POST",
        data,
      }),
      invalidatesTags: ["mission"],
    }),

    deleteMission: builder.mutation({
      query: (id) => ({
        url: `/mission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mission"],
    }),
    getAllMission: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/mission",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["mission"],
    }),
    getSingleMission: builder.query({
      query: (id) => ({
        url: `/mission/${id}`,
        method: "GET",
      }),
      providesTags: ["mission"],
    }),
    updateMission: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/mission/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["mission"],
    }),
  }),
});

export const {
  useGetAllMissionQuery,
  useCreatMissionMutation,
  useDeleteMissionMutation,
  useGetSingleMissionQuery,
  useUpdateMissionMutation,
} = missionApi;
