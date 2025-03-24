"use client";
// pages/groups.tsx
import { useEffect, useState } from "react";
import { fetchGroups } from "@/api/api/group";
import GroupCard from "@/components/groupcard/page";
import GroupFloatingButton from "@/components/button/groupButton";
import { useAuthStore } from "@/store/authStore";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const userName = typeof user === "string" ? user : user?.name || "";

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const groupsData = await fetchGroups();
        setGroups(groupsData);
      } catch (error) {
        console.error("無法獲取群組資料", error);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  const handleGroupUpdated = (updatedGroups: any[]) => {
    setGroups(updatedGroups);
  };

  if (loading) {
    return <div>加載中...</div>;
  }

  return (
    <div className="pl-4"> {/* 添加內邊距改善手機體驗 */}
      <h1 className="text-2xl font-bold">群組</h1>
      <div className="mt-5 flex flex-wrap gap-4"> {/* 使用 flex-wrap 和 gap 控制卡片間距 */}
        <GroupCard
          groups={groups}
          userName={userName}
          onGroupUpdated={handleGroupUpdated}
        />
      </div>
      <GroupFloatingButton />
    </div>
  );
}