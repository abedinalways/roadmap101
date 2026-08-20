import type { User } from "@/types/auth";

const DEMO_USERS: (User & { password: string })[] = [
  {
    id: "1",
    email: "admin@devroadmap.com",
    name: "Admin User",
    role: "admin",
    password: "admin123",
  },
  {
    id: "2",
    email: "user@devroadmap.com",
    name: "Demo User",
    role: "user",
    password: "user123",
  },
];

export const demoAuth = {
  login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `demo-token-${user.id}-${Date.now()}`,
    };
  },

  validateToken: (token: string): User | null => {
    if (!token.startsWith("demo-token-")) return null;

    const userId = token.split("-")[2];
    const user = DEMO_USERS.find((u) => u.id === userId);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};
