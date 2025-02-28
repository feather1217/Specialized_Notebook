import User from "@/model/user";

const users: User[] = [
    {
        ID: 1,
        account: "mao",
        password: "1217",
        name: "羽毛毛",

        phone: "0912345678",
        birthday: "2000-12-17",
        female: 0,
        email: "mao@example.com",
    },
];

export const mockRegister = async (user: User) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 檢查 email 是否已經存在
            const exists = users.some(u => u.email === user.email);
            if (exists) {
                reject("該信箱已被註冊");
            } else {
                // 儲存新用戶
                const newUser = { ...user, id: users.length + 1 };
                users.push(newUser);
                resolve(newUser);
            }
        }, 500);
    });
};


export const mockLogin = async (account: string, password: string) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 在 users 陣列中查找帳號和密碼是否匹配
            const user = users.find(u => u.account === account && u.password === password);
            user ? resolve(user) : reject("帳號或密碼錯誤");
        }, 500);
    });
};

