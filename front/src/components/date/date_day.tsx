// app/Date.tsx
"use client";

import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";




dayjs.locale("zh-cn");

export const getMDay = (year: number, month: number): Dayjs[] => {
    let firstDay = dayjs(`${year}-${month}-01`); //計算第一天
    let lastDay = firstDay.endOf("month"); //計算最後一天
    // 補全前面的天數
    while (firstDay.day() !== 0) {
        firstDay = firstDay.subtract(1, "day");
    }
    // 補全後面的天數
    while (lastDay.day() !== 6) {
        lastDay = lastDay.add(1, "day");
    }
    const days: Dayjs[] = [];
    let tempDate = firstDay;
    //填充日期
    while (tempDate.isBefore(lastDay) || tempDate.isSame(lastDay)) {
        days.push(tempDate);
        tempDate = tempDate.add(1, "day");
    }
    return days;
};


function DateM() {

    const [month, setMonth] = useState<Dayjs>(dayjs());
    const days = getMDay(month.year(), month.month() + 1);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const today = dayjs()// 當天日期

    const btn = (action: number) => {
        setMonth((prevMonth: Dayjs) => prevMonth.add(action, "month"));
    };

    const weekTitles = useMemo(() => {
        return [...Array(7)].map((_, weekInx) => {
            return dayjs().day(weekInx);
        });
    }, []);

    //days.forEach((day) => console.log(day.format("YYYY-MM-DD")));

    const dateClick = (day: Dayjs) => {
        const dayString = day.format("YYYY-MM-DD");
        setSelectedDate(dayString);
        console.log("選擇的日期:", dayString);
    };

    return (
        <div className=" flex flex-col w-3/4 rounded overflow-hidden mb-10">
            <div className="flex items-baseline bg-[#b1dfdb] justify-between pt-0.3 pb-0.3">
                <Button variant="ghost" className="" onClick={() => btn(-1)}>
                    <CaretLeft size={32} />
                </Button>
                <div className="font-bold text-xl">
                    {month.format("MMM YYYY")}
                </div>
                <Button variant="ghost" onClick={() => btn(+1)}>
                    <CaretRight size={32} />
                </Button>

            </div>
            <div className="grid grid-cols-7 justify-items-startr pl-2 pt-2 pb-2  ">
                {weekTitles.map((title, index) => (
                    <div key={`week-${index}`} className="font-bold">
                        {title.format("dd")}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 flex-1 mt-1 ">
            {days.map((day) => {
                    const dayString = day.format("YYYY-MM-DD");
                    const isSelected = selectedDate === dayString;
                    const isToday = day.isSame(today, "day"); // 這裡比較才會正確

                    return (
                        <div
                        key={dayString}
                        onClick={() => dateClick(day)}
                        className="border-b border-gray-200 pt-2 cursor-pointer pl-2"
                    >
                        <span
                            className={`inline-flex  w-8 h-8 rounded-full pl-2
                                ${isSelected ? "bg-[#b1dfdb]" : ""}
                                ${isToday ? "bg-[#548985] text-white font-bold" : ""}
                            `}
                        >
                            {day.format("DD")}
                        </span>
                    </div>
                    );
                })}
            </div>
        </div>

    );
};

export default DateM;


