import {
  login as appwriteLogin,
  loginWithOAuth as appwriteLoginWithOAuth,
  logout as appwriteLogout,
  register as appwriteRegister,
  getCurrentUser,
} from "@/lib/appwrite";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models, OAuthProvider } from "react-native-appwrite";

type AppwriteContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AppwriteContext = createContext<AppwriteContextType | null>(null);

export const useAppwrite = () => {
  const context = useContext(AppwriteContext);
  if (!context) {
    throw new Error("useAppwrite must be used within an AppwriteProvider");
  }
  return context;
};

const AppwriteProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const loginWithOAuth = async (provider: OAuthProvider) => {
    const result = await appwriteLoginWithOAuth(provider);
    if (!result.success) {
      throw new Error(result.error);
    }
    const user = await getCurrentUser();
    setUser(user);
    setIsAuthenticated(!!user);
  };

  const login = async (email: string, password: string) => {
    const result = await appwriteLogin(email, password);
    if (!result.success) {
      throw new Error(result.error);
    }
    const user = await getCurrentUser();
    setUser(user);
    setIsAuthenticated(!!user);
  };

  const register = async (email: string, password: string, name: string) => {
    const result = await appwriteRegister(email, password, name);
    if (!result.success) {
      throw new Error(result.error);
    }
    const loginResult = await appwriteLogin(email, password);
    if (!loginResult.success) {
      throw new Error(loginResult.error);
    }
    const user = await getCurrentUser();
    setUser(user);
    setIsAuthenticated(!!user);
  };

  const logout = async () => {
    const result = await appwriteLogout();
    if (!result.success) {
      throw new Error(result.error);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AppwriteContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        loginWithOAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteProvider;
