"use client";


import { useState } from "react";
import { mockRegister } from "../../api/api/mockAuth";
import User from "@/model/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
  const [formData, setFormData] = useState<User>({
    ID: 0,
    name: "",
    account: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    female: 0, 
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await mockRegister(formData);
      console.log("註冊成功", newUser);
      router.push("/signin");
      toast.success("註冊成功");
    } catch (err) {
      setError(err as string);
      toast.error("該信箱已被註冊 ! ", {
        style: {
          color: '#f44336',
        },
      });  
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg w-1/3">
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">註冊</h1>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 px-1">
          <label className="text-xl font-medium text-gray-600">帳號 <span className="text-red-500">*</span></label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="text"
            value={formData.account}
            onChange={e => setFormData({ ...formData, account: e.target.value })}
            placeholder=""
            required
          />
        </div>
        <div className="flex flex-col w-1/2 px-1">
          <label className="text-xl font-medium text-gray-600">暱稱</label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder=""
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 px-1">
          <label htmlFor="email" className="text-xl font-medium text-gray-600">信箱 <span className="text-red-500">*</span></label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder=""
            required
          />
        </div>
        <div className="flex flex-col w-1/2 px-1">
          <label className="text-xl font-medium text-gray-600">生日</label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="date"
            value={formData.birthday}
            onChange={e => setFormData({ ...formData, birthday: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-xl font-medium text-gray-600">密碼 <span className="text-red-500">*</span></label>
        <input
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
          type="password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          placeholder=""
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-1 bg-[#74d6ce] text-white p-3 mt-3 text-xl rounded-md hover:bg-[#4c8b86] focus:outline-none focus:ring-[#000000]"
      >
        註冊
      </button>
    </form>
  );
};

export default SignUpForm;
