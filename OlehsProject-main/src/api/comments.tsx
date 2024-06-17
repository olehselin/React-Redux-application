import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utilities/axiosBaseQuery";
import { CommentType } from "../types/comments";

export const commentsApi = createApi({
  reducerPath: "comments/api",
  baseQuery: axiosBaseQuery({
    baseUrl: "/comments",
  }),
  endpoints: (build) => ({
    getCommentById: build.query<CommentType[], number>({
      query: (postId) => ({
        url: "",
        params: { postId },
      }),
    }),
  }),
});

export const { useGetCommentByIdQuery } = commentsApi;
