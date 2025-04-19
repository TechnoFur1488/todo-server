import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Task {
    id: number;
    name: string;
    title: string;
    userId: number;
}

interface Auth {
    id: number;
    name: string;
    email: string;
    password: string;
    token: string; 
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        registration: builder.mutation<Auth, Partial<Auth>>({
            query: (newUser) => ({
                url: "/api/user/registration",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Task"],
        }),
        login: builder.mutation<Auth, Partial<Auth>>({
            query: (user) => ({
                url: "/api/user/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Task"],
        }),
        getTask: builder.query<Task[], void>({
            query: () => "/api/task",
            providesTags: ["Task"]
        }),
        createTask: builder.mutation<Task, Partial<Task>>({
            query: (newTask) => ({
                url: "/api/task",
                method: "POST",
                body: newTask
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/task/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"]
        }),
        updateTask: builder.mutation<Task, Partial<Task>>({
            query: ({ id, name, title }) => ({
                url: `/api/task/${id}`,
                method: "PUT",
                body: { name, title }
            }),
            invalidatesTags: ["Task"]
        })
    }),
});

export const { useRegistrationMutation, useLoginMutation, useGetTaskQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = apiSlice;