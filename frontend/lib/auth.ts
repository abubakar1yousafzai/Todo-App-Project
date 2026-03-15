import { createAuthClient } from "better-auth/react";
import { User } from "@/types";

/**
 * Better Auth client-side instance.
 * Optimized for performance by using the correct baseURL.
 */
export const authClient = createAuthClient({
  baseUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});

/**
 * Optimized helper to get the current user from the session.
 * Result is cached by the authClient internally.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: session } = await authClient.getSession();
    if (!session?.user) return null;
    
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name || undefined,
    };
  } catch (error) {
    console.error("Auth Session Error:", error);
    return null;
  }
};

/**
 * Retrieves the session token from Better Auth.
 * Used for authenticating requests to the FastAPI backend.
 */
export const getToken = async (): Promise<string | null> => {
  try {
    const { data: session } = await authClient.getSession();
    return session?.session?.token || null;
  } catch (error) {
    return null;
  }
};
