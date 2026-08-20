"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-edge bg-bg2/80 backdrop-blur-md flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-ink">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-ink">{user?.name}</p>
          <p className="text-xs text-ink3">{user?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-accent font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
