"use client";
// components/group-floating-button.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, FolderSimplePlus, UserCirclePlus } from "@phosphor-icons/react";
import { createGroup, joinGroup } from "@/api/api/group";
import { Card } from "@/components/ui/card";
import AddGroupForm from "@/components/from/addgroup_from"; // 注意路徑是否正確
import CreateGroupForm from "../../components/from/creategroup_from";
import { useAuthStore } from "@/store/authStore";

export default function GroupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);

  const user = useAuthStore((state) => state.user);

  const handleCreateGroup = async (groupName: string) => {
    try {
      if (user) {
        const newGroup = await createGroup(groupName, user.name);
        console.log(`創建群組成功: ${newGroup.group_name}`);
        setIsOpen(false);
        setIsCreatingGroup(false);
      } else {
        console.error("用戶未登錄");
      }
    } catch (error) {
      console.error("創建群組失敗", error);
    }
  };

  const handleJoinGroup = async (groupId: number, userName: string) => {
    try {
      const avatar = user?.avater || "/default-avatar.png"; // 注意拼寫：avater -> avatar
      const updatedGroup = await joinGroup(groupId, userName, avatar);
      if (updatedGroup) {
        console.log(`加入群組成功: ${updatedGroup.group_name}`);
      } else {
        console.error("群組未找到");
      }
      setIsOpen(false);
      setIsJoiningGroup(false);
    } catch (error) {
      console.error("加入群組失敗", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {isOpen && (
          <div className="space-y-2">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-full shadow-md flex items-center"
              onClick={() => {
                setIsJoiningGroup(true);
                setIsCreatingGroup(false);
              }}
            >
              <UserCirclePlus size={32} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="p-3 rounded-full shadow-md flex items-center"
              onClick={() => {
                setIsCreatingGroup(true);
                setIsJoiningGroup(false);
              }}
            >
              <FolderSimplePlus size={32} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <Button
        className="rounded-full mt-5 w-12 h-12 p-4 bg-primary shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={32} weight="bold" />
      </Button>

      {(isCreatingGroup || isJoiningGroup) && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            className="absolute inset-0"
            onClick={() => {
              isCreatingGroup ? setIsCreatingGroup(false) : setIsJoiningGroup(false);
            }}
          />
          <Card className="p-2 sm:p-8 w-[90vw] max-w-[300px] sm:max-w-md z-10"> {/* 手機寬度 90vw，內邊距 p-2 */}
            <h2 className="text-xl font-bold text-center pt-6">
              {isCreatingGroup ? "創建群組" : "加入群組"}
            </h2>
            {isCreatingGroup ? (
              <CreateGroupForm
                onCreateGroup={handleCreateGroup}
                onCancel={() => setIsCreatingGroup(false)}
              />
            ) : (
              <AddGroupForm
                onJoinGroup={handleJoinGroup}
                onCancel={() => setIsJoiningGroup(false)}
                userName={user?.name || ""}
              />
            )}
          </Card>
        </div>
      )}
    </div>
  );
}