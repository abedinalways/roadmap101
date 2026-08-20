"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { demoAuth } from "@/lib/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await demoAuth.login(email, password);
      if (result) {
        dispatch(setCredentials(result));
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🚀</span>
          <h1 className="text-2xl font-bold text-ink">Dev Roadmap</h1>
          <p className="text-ink3 mt-1">Junior to Senior Frontend</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-bad bg-bad/10 p-3 rounded-lg">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-edge/30 rounded-lg">
          <p className="text-xs font-medium text-ink2 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-ink3">
            <p><strong>Admin:</strong> admin@devroadmap.com / admin123</p>
            <p><strong>User:</strong> user@devroadmap.com / user123</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
