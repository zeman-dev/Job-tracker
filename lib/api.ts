import type { LoginValues } from "@/app/login/Login.client";
import { RegisterValues } from "@/app/register/Register.client";
import type { User } from "@/types/user";
import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function login(values: LoginValues): Promise<User>{
    const res = await api.post("/auth/login", values);
return res.data;
}

export async function register(values: RegisterValues): Promise<User>{
  const res = await api.post("/auth/register", values);
  return res.data;
}