import axios from 'axios';
import type { User, Game, Group, Message, Turf, Notification } from './types';

const API_BASE_URL = 'https://us-central1-axilam.cloudfunctions.net/sport_api/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const userAPI = {
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    role: 'player' | 'turf_owner' | 'admin';
    avatar?: string;
    bio?: string;
    skill_level?: string;
  }) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (email: string) => {
    const response = await api.post('/users/login', { email });
    return response.data;
  },

  getUser: async (userId: string): Promise<User> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: string, profileData: any) => {
    const response = await api.put(`/users/${userId}/profile`, profileData);
    return response.data;
  },
};

// Game/Post APIs
export const gameAPI = {
  createGame: async (gameData: {
    user_id: string;
    sport: string;
    players_needed: number;
    location: { lat: number; lng: number; address: string };
    description: string;
    date: string;
    time: string;
  }) => {
    const response = await api.post('/posts/create', gameData);
    return response.data;
  },

  searchNearby: async (searchData: {
    lat: number;
    lng: number;
    radius_km: number;
    sport?: string;
  }): Promise<{ count: number; posts: Game[] }> => {
    const response = await api.post('/posts/nearby', searchData);
    return response.data;
  },

  getGameDetails: async (postId: string): Promise<Game> => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },

  joinGame: async (postId: string, userId: string) => {
    const response = await api.post(`/posts/${postId}/join`, { user_id: userId });
    return response.data;
  },

  leaveGame: async (postId: string, userId: string) => {
    const response = await api.post(`/posts/${postId}/leave`, { user_id: userId });
    return response.data;
  },

  deleteGame: async (postId: string, userId: string) => {
    const response = await api.delete(`/posts/${postId}/delete`, {
      data: { user_id: userId },
    });
    return response.data;
  },
};

// Group Chat APIs
export const groupAPI = {
  getUserGroups: async (userId: string): Promise<{ count: number; groups: Group[] }> => {
    const response = await api.get(`/groups/${userId}`);
    return response.data;
  },

  getMessages: async (groupId: string): Promise<{ count: number; messages: Message[] }> => {
    const response = await api.get(`/groups/${groupId}/messages`);
    return response.data;
  },

  sendMessage: async (groupId: string, userId: string, message: string) => {
    const response = await api.post(`/groups/${groupId}/messages`, {
      user_id: userId,
      message,
    });
    return response.data;
  },
};

// Turf APIs
export const turfAPI = {
  searchNearby: async (searchData: {
    lat: number;
    lng: number;
    radius_km: number;
    sport?: string;
  }): Promise<{ count: number; turfs: Turf[] }> => {
    const response = await api.post('/turfs/search/nearby', searchData);
    return response.data;
  },

  getTurfDetails: async (turfId: string): Promise<Turf> => {
    const response = await api.get(`/turfs/${turfId}`);
    return response.data;
  },

  bookTurf: async (turfId: string, bookingData: {
    user_id: string;
    date: string;
    time_slot: string;
    group_id?: string;
  }) => {
    const response = await api.post(`/turfs/${turfId}/book`, bookingData);
    return response.data;
  },
};

// Notification APIs
export const notificationAPI = {
  getNotifications: async (userId: string, unreadOnly = false): Promise<{ count: number; unread_count: number; notifications: Notification[] }> => {
    const response = await api.get(`/notifications/${userId}`, {
      params: { unread_only: unreadOnly },
    });
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.post(`/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async (userId: string) => {
    const response = await api.post(`/notifications/${userId}/read-all`);
    return response.data;
  },
};

export default api;
