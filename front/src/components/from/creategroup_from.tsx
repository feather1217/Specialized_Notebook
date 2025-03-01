// components/from/addgroup_from.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface CreateGroupFormProps {
  onCreateGroup: (groupName: string) => void;
  onCancel: () => void;
}

const CreateGroupForm = ({ onCreateGroup, onCancel }: CreateGroupFormProps) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = () => {
    if (groupName.trim() === "") {
        toast.error("請輸入群組名稱 ! ", {
            style: {
              color: "#f44336",
            },
          });
      return;
    }
    toast.success(`成功創建群組: ${groupName}`);
    onCreateGroup(groupName);
    onCancel(); 
  };

  return (
    <div className="space-y-4">
      <label className="  text-gray-600 ">名稱</label>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="輸入群組名稱"
        className="border p-2 w-full rounded-md mt-2"
      />
      <div className="flex space-x-2">
        <Button className=" bg-[#74d6ce] text-white p-3 mt-2 w-full rounded-md hover:bg-[#4c8b86] " onClick={handleSubmit}>
          確定
        </Button>

      </div>
    </div>
  );
};

export default CreateGroupForm;
