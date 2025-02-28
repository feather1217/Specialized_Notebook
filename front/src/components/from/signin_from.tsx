"use client";
import { useState } from "react";
import { mockLogin } from "../../api/api/mockAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore"; // 引入 Zustand
import User from "@/model/user";

const SignInForm = () => {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>("");  
    const router = useRouter();
    const login = useAuthStore((state) => state.login); // 取得 login 方法

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await mockLogin(account, password) as User;
            login(user);  // 儲存登入狀態
            toast.success(`歡迎回來, ${user.name}!`);
            router.push("/");
        } catch (err) {
            setError(err as string);
            toast.error(err as string);
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg w-80">
            <h1 className="text-2xl font-bold text-gray-800 text-center">登入</h1>
            <div className="flex flex-col space-y-2">
                <label htmlFor="account" className="text-xl font-medium text-gray-600">帳號</label>
                <input id="account" type="text" value={account} onChange={e => setAccount(e.target.value)}
                    placeholder="輸入帳號" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#548985]" required />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-xl font-medium text-gray-600">密碼</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="輸入密碼" className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#548985]" required />
            </div>
            <button type="submit" className="w-full bg-[#74d6ce] text-white p-3 mt-3 text-xl rounded-md hover:bg-[#4c8b86]">登入</button>
        </form>
    );
};

export default SignInForm;
