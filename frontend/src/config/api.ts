// src/config/api.ts

// Автоматично визначаємо BASE_URL
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const API_ENDPOINTS = {
  BASE_URL: API_URL,
  LOGIN: `${API_URL}/login`,
  REGISTER: `${API_URL}/register`,
  ME: `${API_URL}/me`,
  UPDATE_POINTS: (points: number) => `${API_URL}/update-points/${points}`,
};

export const fetchOptions = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};