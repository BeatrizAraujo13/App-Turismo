import { api } from "./API.js";
import * as SecureStore from "expo-secure-store";

export async function login(email, senha) {
  try {
    const response = await api.post(
      "/login",
      new URLSearchParams({
        username: email,
        password: senha,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = response.data.access_token;
    await SecureStore.setItemAsync("token", token);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.detail || "Erro ao fazer login",
    };
  }
}

export async function logout() {
  await SecureStore.deleteItemAsync("token");
}

export async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export async function authHeader() {
  const token = await getToken();
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}