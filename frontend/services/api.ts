import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (data: { email: string; password: string; name: string; phone: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  verifyEmail: async (data: { email: string; otp: string }) => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const recyclersAPI = {
  search: async (params: { lat?: number; lng?: number; radius?: number }) => {
    const response = await api.get('/recyclers/search', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/recyclers/${id}`);
    return response.data;
  },
};

export default api;
