// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://guiacaruaruapi.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Todas as funções que seu app usa
export const apiServices = {
  // Pontos turísticos
  getPontosTuristicos: () =>
    api.get('/mapa/pins?tipo=tourist_attraction'),

  // Restaurantes/Comedorias
  getComedorias: () =>
    api.get('/mapa/pins?tipo=restaurant'),

  // Hospedagem
  getHospedagem: () =>
    api.get('/mapa/pins?tipo=lodging'),

  // Eventos
  getEventos: () =>
    api.get('/eventos'),

  // Favoritos
  getFavoritos: (token) =>
    api.get("/user/favoritos", {
      headers: { Authorization: `Bearer ${token}` }
    }),

  addFavorito: (place_id, token) =>
    api.post("/user/favorito", { place_id }, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  removeFavorito: (place_id, token) =>
    api.delete(`/user/favorito/${place_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Busca
  searchPlace: (query) =>
    api.get(`/search/place?q=${query}`),

  // 🔥 Feedback
  enviarFeedback: (sentimento, comentario) =>
    api.post("/feedback", {
      sentimento,
      comentario,
    }),
};

export default api;