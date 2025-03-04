class User {
    role: number;
    name: string;
    avatar: string; // 新增頭像屬性

    constructor(role: number, name: string, avatar: string) {
        this.role = role; // 0: 管理員, 1: 一般使用者
        this.name = name;
        this.avatar = avatar; // 存儲頭像 URL
    }
}

export default class Group {
    ID: number;
    group_name: string;
    users: Array<User>;

    constructor(ID: number, group_name: string, users: Array<User> = []) {
        this.ID = ID;
        this.group_name = group_name;
        this.users = users;
    } 
}
