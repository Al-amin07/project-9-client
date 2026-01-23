/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  isPremium?: boolean;
  exp: number;
  iat: number;
}

export const setAccessToken = (token: string): void => {
  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
};

export const removeAccessToken = (): void => {
  document.cookie = "accessToken=; path=/; max-age=0";
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  
  if (!tokenCookie) return null;
  
  return tokenCookie.trim().substring('accessToken='.length);
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getUserFromToken = (): Partial<JWTPayload> | null => {
  const token = getAccessToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const { id, email, fullName, role, isPremium } = decoded;
    return { id, email, fullName, role, isPremium };
  } catch (error) {
    return null;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAccessToken();
  
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `${token}` } : {})
  };
  
  return fetch(url, {
    ...options,
    headers
  });
}; 