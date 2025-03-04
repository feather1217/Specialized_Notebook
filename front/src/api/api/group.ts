// api/group.ts
import Group from "@/model/group";

let mockGroups: Group[] = [
    new Group(1, "專研", [{ role: 0, name: "猴子",avatar:"/images/images.jpg" }, { role: 1, name: "47",avatar:"/images/images1.jpg" }]),
    new Group(2, "家人", [{ role: 0, name: "Alice", avatar:"https://github.com/shadcn.png" }, { role: 1, name: "Charlie", avatar:"https://github.com/shadcn.png" }]),
    new Group(3, "朋友", [{ role: 0, name: "Alice", avatar:"https://github.com/shadcn.png" }, { role: 1, name: "David", avatar:"https://github.com/shadcn.png" }]),
];

// 取得所有群組
export const fetchGroups = async (): Promise<Group[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockGroups), 500));
};

export const createGroup = async (groupName: string, userName: string): Promise<Group> => {
    return new Promise((resolve) => {
        const newGroup = new Group(mockGroups.length + 1, groupName, [
            { role: 0, name: userName, avatar: "" } 
        ]);
        mockGroups.push(newGroup);
        setTimeout(() => resolve(newGroup), 500);
    });
};


// 加入群組
export const joinGroup = async (groupId: number, userName: string, avatar: string): Promise<Group | null> => {
    return new Promise((resolve) => {
        const group = mockGroups.find((g) => g.ID === groupId);
        if (group) {
            group.users.push({ role: 1, name: userName, avatar:avatar });
            setTimeout(() => resolve(group), 500);
        } else {
            setTimeout(() => resolve(null), 500);
        }
    });
};

// 退出群組
export const leaveGroup = async (groupId: number, userName: string): Promise<Group | null> => {
    return new Promise((resolve) => {
        const group = mockGroups.find((g) => g.ID === groupId);
        if (group) {
            // 移除指定用戶
            group.users = group.users.filter((user) => user.name !== userName);
            setTimeout(() => resolve(group), 500);
        } else {
            setTimeout(() => resolve(null), 500);
        }
    });
};