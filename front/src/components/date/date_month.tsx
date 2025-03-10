"use client";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

dayjs.locale("zh-cn");

export const getMDay = (year: number, month: number): Dayjs[] => {
    let firstDay = dayjs(`${year}-${month}-01`);
    let lastDay = firstDay.endOf("month");

    while (firstDay.day() !== 0) firstDay = firstDay.subtract(1, "day");
    while (lastDay.day() !== 6) lastDay = lastDay.add(1, "day");

    const days: Dayjs[] = [];
    //日期加入陣列
    for (let tempDate = firstDay; tempDate.isBefore(lastDay) || tempDate.isSame(lastDay); tempDate = tempDate.add(1, "day")) {
        days.push(tempDate);
    }
    return days;
};

function DateM({ selectedDate, onSelectDate }: { selectedDate: Dayjs; onSelectDate: (date: Dayjs) => void }) {
    const [month, setMonth] = useState<Dayjs>(dayjs());//當前月份
    const [showSelector, setShowSelector] = useState(false);//是否顯示月份選擇器
    const days = getMDay(month.year(), month.month() + 1);//當前月份的日期
    const today = dayjs();//當前日期
    const selectorRef = useRef<HTMLDivElement | null>(null);//看是不是點擊了選擇器外面

    const todayYear = today.year();//當前年份

    const weekTitles = useMemo(() => [...Array(7)].map((_, i) => dayjs().day(i)), []);
    //切換月份
    const changeMonth = useCallback((action: number) => {
        setMonth((prev) => prev.add(action, "month"));
    }, []);

    const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [year, month] = e.target.value.split("-").map(Number);
        if (year && month !== undefined) {
            setMonth(dayjs(`${year}-${month + 1}-01`));
            setShowSelector(false);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
            setShowSelector(false);
        }
    };
    //監聽點擊事件看要不要關閉選擇框
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col w-3/4 rounded overflow-hidden mb-10 relative">
            <div className="flex items-baseline bg-[#b1dfdb] justify-between pt-0.3 pb-0.3">
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => changeMonth(-1)}>
                    <CaretLeft size={32} />
                </Button>
                <div className="font-bold text-xl cursor-pointer" onClick={() => setShowSelector(true)}>
                    {month.format("MMM YYYY")}
                </div>
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => changeMonth(1)}>
                    <CaretRight size={32} />
                </Button>
            </div>

            {showSelector && (
                <div ref={selectorRef} className="absolute bg-white shadow-lg p-4 rounded-lg mt-12 w-64 z-10 left-1/2 transform -translate-x-1/2">
                    <div className="flex justify-center gap-4">
                        <select onChange={handleMonthSelect} value={`${month.year()}-${month.month()}`} className="block w-24 p-2 border rounded">
                            {Array.from({ length: 100 }, (_, index) => {
                                const year = todayYear + index - 50;
                                return <option key={year} value={`${year}-${month.month()}`}>{year}</option>;
                            })}
                        </select>

                        <select onChange={handleMonthSelect} value={`${month.year()}-${month.month()}`} className="block w-24 p-2 border rounded">
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={`${month.year()}-${i}`}>
                                    {dayjs().month(i).format("MMM")}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-7 pl-3 pt-2 pb-2">
                {weekTitles.map((title, index) => (
                    <div key={`week-${index}`} className="font-bold">
                        {title.format("dd")}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 flex-1 mt-1">
                {days.map((day) => {
                    const isSelected = selectedDate.isSame(day, "day");
                    const isToday = day.isSame(today, "day");
                    const isOtherMonth = day.month() !== month.month();

                    return (
                        <div key={day.format("YYYY-MM-DD")} onClick={() => onSelectDate(day)} className="border-t border-gray-200 cursor-pointer">
                            <span
                                className={`inline-flex w-8 h-8 rounded-full items-center justify-center
                                ${isSelected ? "bg-[#b1dfdb]" : ""}
                                ${isToday ? "bg-[#548985] text-white font-bold" : ""}
                                ${isOtherMonth ? "text-gray-300" : "text-black"}`}
                            >
                                {day.format("DD")}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DateM;
