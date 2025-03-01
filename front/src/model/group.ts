class user {
    role: number;
    name: string;

    constructor(role: number, name: string) {
        this.role = role; // 0: 管理員, 1: 一般使用者
        this.name = name; 
    }
}

export default class Group {
    ID: number;
    group_name: string;
    users: Array<user>;

    constructor(ID: number, group_name: string, users: Array<user> = []){
        this.ID = ID;
        this.group_name = group_name;
        this.users = users;
    } 
}