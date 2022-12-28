import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { PasswordUpdateModel, UserRegisterModel } from "../types/index";

const userRegisterEndpoint = import.meta.env.VITE_API_URL + "/auth/signup";
const userLoginEndpoint = import.meta.env.VITE_API_URL + "/auth/login";
export const getUserInfoEndpoint = import.meta.env.VITE_API_URL + "/auth/getUserInfo";
const changePasswordEndpoint = import.meta.env.VITE_API_URL + "/auth/changePassword";

export const getUserInfo = () =>
  useQuery("getUserInfo", () => axios.get(getUserInfoEndpoint).then((res) => res.data), {
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useUserRegister = () =>
  useMutation("userRegister", (body: UserRegisterModel) => axios.post(userRegisterEndpoint, body), {
    onSuccess() {
      toast.success("Signup Success. You can login now.");
    },
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useUserLogin = () =>
  useMutation("userLogin", (body: UserRegisterModel) => axios.post(userLoginEndpoint, body), {
    onSuccess(data: AxiosResponse) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.data?.accessToken}`;
      localStorage.setItem("accessToken", data.data?.accessToken);
      toast.success("Successfully logged in.");
    },
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });

export const useUserPasswordUpdate = () =>
  useMutation("userLogin", (body: PasswordUpdateModel) => axios.patch(changePasswordEndpoint, body), {
    onSuccess() {
      toast.success("Password changed successfully. you can login with new password now.");
      localStorage.removeItem("accessToken");
    },
    onError(error: Error | AxiosError) {
      toast.error(axios.isAxiosError(error) ? error?.response?.data?.message : error.message);
    },
  });
