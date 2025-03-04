"use client";
// components/groupcard.tsx
import { Card } from "@/components/ui/card"; // 引入 Card 組件來顯示群組
import { Button } from "@/components/ui/button"; // 引入 Button 組件來處理事件
import { toast } from "sonner"; // 引入 toast 來顯示提示訊息
import Image from "next/image"; // 引入 Image 組件來顯示頭像

interface User {
  name: string;
  avatar: string;
}

interface Group {
  ID: number;
  group_name: string;
  users: User[];
}

interface GroupCardProps {
  groups: Group[]; // 傳入群組資料
  userName: string; // 當前用戶名稱
  onGroupUpdated: (updatedGroups: Group[]) => void; // 更新群組的回調
}

const GroupCard = ({ groups, userName, onGroupUpdated }: GroupCardProps) => {
  const handleExitGroup = (groupId: number) => {
    // 移除該群組
    toast.success(`成功退出群組! ${userName}`);
    const updatedGroups = groups.filter((group) => group.ID !== groupId);
    onGroupUpdated(updatedGroups); // 更新群組狀態
  };

  if (groups.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        尚未加入任何群組!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4  ">
  {groups.map((group) => (
    <Card key={group.ID} className="p-6 shadow-md rounded-lg mr-9">
      <h2 className="text-lg font-bold">{group.group_name}</h2>
      <div className="mt-3 space-y-2">
        {group.users.map((user) => (
          <div key={user.name} className="flex items-center space-x-3">
            <Image
              src={user.avatar || "https://github.com/shadcn.png"} // 頭像，如果沒有就用預設
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full w-8 h-8 object-cover"
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>
      <Button
        className="bg-[#74d6ce] text-white p-3 mt-2 w-full rounded-md hover:bg-[#4c8b86]"
        onClick={() => handleExitGroup(group.ID)} // 點擊退出群組
      >
        退出群組
      </Button>
    </Card>
  ))}
</div>
  );
};

export default GroupCard;

