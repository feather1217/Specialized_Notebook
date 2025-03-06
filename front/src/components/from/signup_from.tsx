"use client";

import { useState } from "react";
import { mockRegister } from "../../api/api/mockAuth";
import User from "@/model/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarBlank } from "@phosphor-icons/react";


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
    avater: "", // Add the missing avater property
  });

  const [error, setError] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
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
          color: "#f44336",
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg w-1/3"
    >
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">註冊</h1>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 px-1">
          <label className="text-xl font-medium text-gray-600">
            帳號 <span className="text-red-500">*</span>
          </label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="text"
            value={formData.account}
            onChange={(e) => setFormData({ ...formData, account: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col w-1/2 px-1">
          <label className="text-xl font-medium text-gray-600">暱稱</label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 px-1">
          <label htmlFor="email" className="text-xl font-medium text-gray-600">
            信箱 <span className="text-red-500">*</span>
          </label>
          <input
            className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* 替換成 shadcn/ui Calendar */}
        <div className="flex flex-col w-1/2 px-1">
          <label className="text-xl font-medium text-gray-600">生日</label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="p-6 mt-2 w-full justify-start text-left border border-gray-300 rounded-md"
              >                
                <CalendarBlank size={32} color="#545454"  />
                {formData.birthday ? format(new Date(formData.birthday), "yyyy-MM-dd") : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.birthday ? new Date(formData.birthday) : undefined}
                onSelect={(date) => {
                  if (date) {
                    setFormData({ ...formData, birthday: date.toISOString().split("T")[0] });
                  }
                  setCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-xl font-medium text-gray-600">
          密碼 <span className="text-red-500">*</span>
        </label>
        <input
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#548985]"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
