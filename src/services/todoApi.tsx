// src/features/api/todoApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: sting = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos/create",
        method: "POST",
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/todos/${id}/update`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
