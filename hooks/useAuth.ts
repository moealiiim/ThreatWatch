import { useEffect, useState } from "react";

import { subscribeToAuthChanges } from "../services/authService";
import { AuthUser } from "../types/auth";

type UseAuthResult = {
  user: AuthUser | null;
  isLoading: boolean;
};

export const useAuth = (): UseAuthResult => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading };
};
