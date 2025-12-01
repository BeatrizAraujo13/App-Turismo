// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://guiacaruaruapi.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const apiServices = {
  // Pontos turísticos
  getPontosTuristicos: () => api.get('/mapa/pins?tipo=tourist_attraction'),
  
  // Restaurantes/Comedorias
  getComedorias: () => api.get('/mapa/pins?tipo=restaurant'),

  // Hospedagem
  getHospedagem: () => api.get('/mapa/pins?tipo=lodging'),
  
  // Eventos
  getEventos: () => api.get('/eventos'),
  
  // Favoritos
  getFavoritos: () => api.get('/user/favoritos'),
  addFavorito: (data) => api.post('/user/favorite', data),
  
  // Avaliações
  getAvaliacoes: (placeId) => api.get(`/avaliacoes/${placeId}`),
  criarAvaliacao: (data) => api.post('/avaliacoes', data),
  
  // Busca
  searchPlace: (query) => api.get(`/search/place?q=${query}`),
};

export default api;