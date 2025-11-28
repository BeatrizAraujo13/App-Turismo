import axios from "axios";

// CONFIGURAÇÃO DO SERVIDOR
const API_URL = "http://192.168.0.11:8000";

// Instância do Axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

/* ------------------ EVENTOS ------------------ */
export async function listarEventos() {
  const res = await api.get("/eventos");
  return res.data;
}

/* ------------------ RESTAURANTES ------------------ */
export async function listarRestaurantes() {
  const res = await api.get("/restaurantes");
  return res.data;
}

/* ------------------ HOSPEDAGEM ------------------ */
export async function listarHospedagem() {
  const res = await api.get("/hospedagem");
  return res.data;
}

/* ------------------ PONTOS TURÍSTICOS ------------------ */
export async function listarPontos() {
  const res = await api.get("/pontos");
  return res.data;
}

/* ------------------ FAVORITOS ------------------ */
export async function listarFavoritos() {
  const res = await api.get("/favoritos");
  return res.data;
}

export async function adicionarFavorito(dados) {
  const res = await api.post("/favoritos", dados);
  return res.data;
}

export async function removerFavorito(id) {
  const res = await api.delete(`/favoritos/${id}`);
  return res.data;
}
