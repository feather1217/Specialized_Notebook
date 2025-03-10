"use client";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

dayjs.locale("zh-cn");

export const getMDay = (year: number, month: number): Dayjs[] => {
  let firstDay = dayjs(`${year}-${month}-01`);
  let lastDay = firstDay.endOf("month");

  while (firstDay.day() !== 0) {
    firstDay = firstDay.subtract(1, "day");
  }
  while (lastDay.day() !== 6) {
    lastDay = lastDay.add(1, "day");
  }

  const days: Dayjs[] = [];
  let tempDate = firstDay;
  while (tempDate.isBefore(lastDay) || tempDate.isSame(lastDay)) {
    days.push(tempDate);
    tempDate = tempDate.add(1, "day");
  }
  return days;
};


function DateM({ selectedDate, onSelectDate }: { selectedDate: Dayjs; onSelectDate: (date: Dayjs) => void }) {
  const [month, setMonth] = useState<Dayjs>(dayjs());
  const days = getMDay(month.year(), month.month() + 1);
  const today = dayjs();

  const btn = (action: number) => {
    setMonth((prevMonth) => prevMonth.add(action, "month"));
  };

  const weekTitles = useMemo(() => {
    return [...Array(7)].map((_, weekInx) => dayjs().day(weekInx));
  }, []);

  return (
    <div className="flex flex-col w-3/4 rounded overflow-hidden mb-10">
      <div className="flex items-baseline bg-[#b1dfdb] justify-between pt-0.3 pb-0.3">
        <Button variant="ghost" className="hover:bg-transparent" onClick={() => btn(-1)}>
          <CaretLeft size={32} />
        </Button>
        <div className="font-bold text-xl">{month.format("MMM YYYY")}</div>
        <Button variant="ghost" className="hover:bg-transparent" onClick={() => btn(+1)}>
          <CaretRight size={32} />
        </Button>
      </div>

      <div className="grid grid-cols-7 pl-3 pt-2 pb-2">
        {weekTitles.map((title, index) => (
          <div key={`week-${index}`} className="font-bold">
            {title.format("dd")}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-1 mt-1">
        {days.map((day) => {
          const dayString = day.format("YYYY-MM-DD");
          const isSelected = selectedDate.isSame(day, "day");
          const isToday = day.isSame(today, "day");
          const otherMonth = day.month() !== month.month();

          return (
            <div
              key={dayString}
              onClick={() => onSelectDate(day)}
              className="border-t border-gray-200 cursor-pointer"
            >
              <span
                className={`inline-flex w-8 h-8 rounded-full items-center justify-center
                    ${isSelected ? "bg-[#b1dfdb]" : ""}
                    ${isToday ? "bg-[#548985] text-white font-bold" : ""}
                    ${otherMonth ? "text-gray-400" : "text-black"} 
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
}

export default DateM;
