"use client";  // 確保這是客戶端組件

import { useState } from "react";
import { mockLogin } from "../../api/api/mockAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInForm = () => {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>("");  // 用來顯示錯誤訊息
    const router = useRouter();

    // 當表單提交時執行此函數
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();  // 阻止表單的默認行為
        try {
            const user = await mockLogin(account, password);
            console.log("登入成功:", user);
            router.push("/");  // 登入成功後跳轉到首頁
            toast.success("登入成功");  // 顯示成功訊息於 toast
        } catch (err) {
            const errorMessage = err as string; // 假設錯誤為字串
            setError(errorMessage);  // 顯示錯誤訊息
            toast.error(errorMessage, {
                style: {
                    color: '#f44336',
                },
            });  // 顯示錯誤訊息於 toast
        }
    };


    return (
        <form onSubmit={handleLogin} className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg w-80">
            <div className="flex justify-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">登入</h1> {/* 這是你的標題 */}
            </div>

            {/* 帳號欄位 */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="account" className="text-xl font-medium text-gray-600">帳號</label>
                <input
                    id="account"
                    type="text"
                    value={account}
                    onChange={e => setAccount(e.target.value)}
                    placeholder="輸入帳號"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
                    required
                />
            </div>

            {/* 密碼欄位 */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-xl font-medium text-gray-600">密碼</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="輸入密碼"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
                    required
                />
            </div>

            {/* 登入按鈕 */}
            <button
                type="submit"
                className="w-full bg-[#74d6ce] text-white p-3 mt-3 text-xl rounded-md hover:bg-[#4c8b86] focus:outline-none focus:ring-[#000000]"
            >
                登入
            </button>

        </form>
    );
};

export default SignInForm;
