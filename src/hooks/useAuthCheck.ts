/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUserFromToken, fetchWithAuth } from '@/lib/auth';

type AuthCheckResult = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: { 
    id?: string;
    email?: string;
    role?: string;
    isPremium?: boolean;
  } | null;
};

const useAuthCheck = (): AuthCheckResult => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AuthCheckResult['user']>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is authenticated using JWT in cookie
        if (isAuthenticated()) {
          // Get user data from token
          const userData = getUserFromToken();
          
          if (userData) {
            setIsLoggedIn(true);
            setUser(userData);
          } else {
            // If token exists but user data can't be decoded, do a backend check
            try {
              // Get user profile data from backend
              const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API}/api/auth/me`);
              
              if (response.ok) {
                const responseData = await response.json();
                setIsLoggedIn(true);
                setUser(responseData.data);
              } else {
                setIsLoggedIn(false);
                setUser(null);
              }
            } catch (error) {
              setIsLoggedIn(false);
              setUser(null);
            }
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isLoggedIn, isLoading, user };
};

export default useAuthCheck; 