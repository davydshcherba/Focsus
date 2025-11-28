// src/config/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  BASE_URL: API_URL,
  LOGIN: `${API_URL}${import.meta.env.VITE_API_LOGIN || '/login'}`,
  REGISTER: `${API_URL}${import.meta.env.VITE_API_REGISTER || '/register'}`,
  ME: `${API_URL}${import.meta.env.VITE_API_ME || '/me'}`,
  UPDATE_POINTS: (points: number) => 
    `${API_URL}${import.meta.env.VITE_API_UPDATE_POINTS || '/update-points'}/${points}`,
};

export const fetchOptions = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};