import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { AddTodoModel, DeleteOrMarkTodoCompleteModel, UpdateTodoModel } from "../types";

const getTodosEndpoint = import.meta.env.VITE_API_URL + "/todos/todos";
const addTodoEndpoint = import.meta.env.VITE_API_URL + "/todos/add";
const updateTodoEndpoint = import.meta.env.VITE_API_URL + "/todos/update";
const markCompleteTodoEndpoint = import.meta.env.VITE_API_URL + "/todos/markCompleted";
const deleteTodoEndpoint = import.meta.env.VITE_API_URL + "/todos/delete";

export const getTodos = () =>
  useQuery(["getTodos"], () => axios.get(getTodosEndpoint).then((res) => res.data?.data), {
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useAddTodo = () =>
  useMutation("addTodo", (body: AddTodoModel) => axios.post(addTodoEndpoint, body), {
    onSuccess() {
      toast.success("Todo added successfully.");
    },
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useUpdateTodo = () =>
  useMutation("updateTodos", (body: UpdateTodoModel) => axios.patch(updateTodoEndpoint, body), {
    onSuccess() {
      toast.success("Todo updated successfully.");
    },
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useMarkTodoCompleted = () =>
  useMutation("markCompleted", (body: DeleteOrMarkTodoCompleteModel) => axios.patch(markCompleteTodoEndpoint, body), {
    onSuccess() {
      toast.success("Todo marked complete successfully.");
    },
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useDeleteTodo = () =>
  useMutation(
    "deleteTodo",
    (body: DeleteOrMarkTodoCompleteModel) => axios.delete(deleteTodoEndpoint, { params: { ...body } }),
    {
      onSuccess() {
        toast.success("Todo deleted successfully.");
      },
      onError(error: Error | AxiosError) {
        toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
      },
    }
  );
