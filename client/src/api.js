import axios from 'axios';

const API_BASE = 'http://localhost:5555';

const api = {
  // Heroes
  getHeroes: () => axios.get(`${API_BASE}/heroes`),
  getHero: (id) => axios.get(`${API_BASE}/heroes/${id}`),

  // Powers
  getPowers: () => axios.get(`${API_BASE}/powers`),
  getPower: (id) => axios.get(`${API_BASE}/powers/${id}`),
  updatePower: (id, data) => axios.patch(`${API_BASE}/powers/${id}`, data),

  // HeroPowers
  createHeroPower: (data) => axios.post(`${API_BASE}/hero_powers`, data),
};

export default api;

