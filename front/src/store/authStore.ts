import { create } from "zustand";
import User from "@/model/user"; // 你的 User 型別

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // 初始狀態未登入
  login: (user) => set({ user }), // 設定登入使用者
  logout: () => set({ user: null }), // 登出時清除使用者資訊
}));
