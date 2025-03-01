"use client";
// pages/groups.tsx
import { useEffect, useState } from "react";
import { fetchGroups } from "@/api/api/group"; // 引入 fetchGroups API
import GroupCard from "@/components/groupcard/page"; // 引入 GroupCard 組件
import GroupFloatingButton from "@/components/group/groupButton";
import { useAuthStore } from "@/store/authStore"; // 引入 Zustand 狀態管理

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]); // 定義群組狀態
  const [loading, setLoading] = useState(true); // 設置加載狀態
  const user = useAuthStore((state) => state.user);
  const userName = typeof user === "string" ? user : user?.name || "";
  // 在組件加載時從 API 取得群組資料
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const groupsData = await fetchGroups(); // 呼叫 fetchGroups API
        setGroups(groupsData); // 更新群組狀態
      } catch (error) {
        console.error("無法獲取群組資料", error);
      } finally {
        setLoading(false); // 結束加載狀態
      }
    };

    loadGroups(); // 執行資料加載
  }, []); // 只在初次渲染時執行

  // 更新群組的回調函數
  const handleGroupUpdated = (updatedGroups: any[]) => {
    setGroups(updatedGroups); // 更新群組資料
  };

  if (loading) {
    return <div>加載中...</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold ">群組</h1>
      <div className="mt-5">
        <GroupCard
          groups={groups} // 傳遞群組資料
          userName={userName} // 傳遞當前用戶名稱
          onGroupUpdated={handleGroupUpdated} // 傳遞更新群組的回調函數
        />
      </div>
      <GroupFloatingButton />
    </div>
  );
}

