import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RoadmapData } from "@/types";

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  tagTypes: ["Roadmap"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getRoadmap: builder.query<RoadmapData, void>({
      query: () => ({
        url: "roadmap",
        headers: { "Cache-Control": "no-store" },
      }),
      providesTags: ["Roadmap"],
    }),
  }),
});

export const { useGetRoadmapQuery } = roadmapApi;
