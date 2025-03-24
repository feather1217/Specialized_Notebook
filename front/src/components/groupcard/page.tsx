"use client";
// components/groupcard.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

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
  groups: Group[];
  userName: string;
  onGroupUpdated: (updatedGroups: Group[]) => void;
}

const GroupCard = ({ groups, userName, onGroupUpdated }: GroupCardProps) => {
  const handleExitGroup = (groupId: number) => {
    toast.success(`成功退出群組! ${userName}`);
    const updatedGroups = groups.filter((group) => group.ID !== groupId);
    onGroupUpdated(updatedGroups);
  };

  if (groups.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        尚未加入任何群組!
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6"> {/* 使用 flex-wrap 和 gap 控制佈局 */}
      {groups.map((group) => (
        <Card
          key={group.ID}
          className="w-64  p-6 shadow-md rounded-lg flex flex-col" // 固定寬高
        >
          <h2 className="text-lg font-bold">{group.group_name}</h2>
          <div className="mt-3 space-y-2 flex-1 overflow-y-auto"> {/* 內容可滾動 */}
            {group.users.map((user) => (
              <div key={user.name} className="flex items-center space-x-3">
                <Image
                  src={user.avatar || "https://github.com/shadcn.png"}
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
            onClick={() => handleExitGroup(group.ID)}
          >
            退出群組
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default GroupCard;