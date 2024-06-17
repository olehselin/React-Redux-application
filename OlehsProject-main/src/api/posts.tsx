import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utilities/axiosBaseQuery";
import { Post } from "../types/posts";

export const postsApi = createApi({
  reducerPath: "posts/api",
  baseQuery: axiosBaseQuery({
    baseUrl: "/posts",
  }),
  endpoints: (build) => ({
    getPostsById: build.query<Post[], string>({
      query: (id) => ({
        url: "",
        params: { userId: id },
      }),
    }),
    addPost: build.mutation<null, Post>({
      query: (post) => ({
        url: "",
        method: "POST",
        data: post,
      }),
    }),
    getPostById: build.query<Post, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    updatePost: build.mutation<Post, Post>({
      query: (post) => ({
        url: `/${post.id}`,
        method: "PUT",
        data: post,
      }),
    }),
    deletePost: build.mutation<number, number>({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsByIdQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
