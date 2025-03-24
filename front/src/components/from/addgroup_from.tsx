// components/from/addgroup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddGroupFormProps {
  onJoinGroup: (groupId: number, userName: string) => void;
  onCancel: () => void;
  userName: string;
}

const AddGroupForm = ({ onJoinGroup, onCancel, userName }: AddGroupFormProps) => {
  const [groupId, setGroupId] = useState(0); // 用於加入群組的 ID

  const handleJoinSubmit = () => {
    if (groupId <= 0) {
      toast.error("請輸入有效的群組 ID！", {
        style: {
          color: "#f44336",
        },
      });
      return;
    }
    toast.success(`成功加入群組, ${userName}!`);
    onJoinGroup(groupId, userName);
    onCancel(); // 加入成功後關閉表單
  };

  return (
    <div className="p-6  space-y-4 w-full max-w-md mx-auto"> 
      <label className="text-gray-600">群組ID</label>
      <input
        type="text"
        value={groupId === 0 ? "" : groupId} // 初始顯示空字串，避免顯示 "0"
        onChange={(e) => setGroupId(Number(e.target.value))}
        placeholder="輸入群組 ID"
        className="border p-2 w-full rounded-md mt-2"
      />
      <div className="flex space-x-2 mt-4">
        <Button
          className="bg-[#74d6ce] text-white p-3 w-full rounded-md hover:bg-[#4c8b86]"
          onClick={handleJoinSubmit}
        >
          加入群組
        </Button>
      </div>
    </div>
  );
};

export default AddGroupForm;