export type AuthUser = {
    username: string;
  };
  
  export type AuthContextType = {
    user: AuthUser | null;
    login: (username: string, password: string) => void;
    logout: () => void;
  };
  
  export const authenticateUser = (username: string, password: string): AuthUser | null => {
    if (username.trim() && password.trim()) {
      return { username };
    }
    return null;
  };
  