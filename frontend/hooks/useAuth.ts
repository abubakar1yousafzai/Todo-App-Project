import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { authClient, getCurrentUser } from "@/lib/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<string | void> => {
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return error.message || "Invalid email or password";
    }

    await fetchUser();
    router.push("/dashboard");
  };

  const logout = async () => {
    setLoading(true);
    await authClient.signOut();
    setUser(null);
    setLoading(false);
    router.push("/login");
  };

  return {
    user,
    loading,
    login,
    logout,
    refreshUser: fetchUser,
  };
};
