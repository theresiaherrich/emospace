import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type UserProfile } from "../utils/user";
import { getUserProfile } from "../services/userservice";

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  refreshKey: number;
  triggerRefresh: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile()
        setUser(res);
      } catch (err) {
        console.error("Gagal fetch user profile", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshKey, triggerRefresh }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};