export default class User {
    ID: number;
    name: string;
    account: string;
    password: string;
    email: string;
    phone: string;
    birthday: string;
    female: number;
    avater: string;


    constructor(
        ID: number = 0,
        name: string,
        account: string,
        password: string,
        email: string,
        phone: string,
        birthday: string,
        female: number = 0,
        avater: string
    ) {
        this.ID = ID;
        this.name = name;
        this.account = account;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
        this.female = female;
        this.avater = avater;
    }
}