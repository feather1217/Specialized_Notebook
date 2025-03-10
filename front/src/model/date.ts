export default class Date {
    ID: number;
    title: string;
    date_start: Date;
    date_end: Date;
    remarks: string;
    group: number;
    all_day: boolean;
    color: number; //規劃固定幾種顏色用編號表示

    constructor(
        ID: number,
        title: string,
        date_start: Date,
        date_end: Date,
        remarks: string,
        group: number,
        all_day: boolean,
        color: number
    ) {
        this.ID = ID;
        this.title = title;
        this.date_start = date_start;
        this.date_end = date_end;
        this.remarks = remarks;
        this.group = group;
        this.all_day = all_day;
        this.color = color;
    }

}