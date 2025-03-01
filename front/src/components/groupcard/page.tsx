// components/groupcard.tsx
import { Card } from "@/components/ui/card"; // 引入 Card 組件來顯示群組
import { Button } from "@/components/ui/button"; // 引入 Button 組件來處理事件
import { toast } from "sonner"; // 引入 toast 來顯示提示訊息

interface Group {
  ID: number;
  group_name: string;
  users: { name: string; role: number }[]; // 使用者名稱與角色
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
    <div className="grid grid-cols-4 gap-4">
      {groups.map((group) => (
        <Card key={group.ID} className="p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold">{group.group_name}</h3>
          <div className="">
            <h4 className="text-lg font-medium">成員:</h4>
            <ul>
              {group.users.map((user, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {user.name}
                </li>
              ))}
            </ul>
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
