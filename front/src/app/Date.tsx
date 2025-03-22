"use client"; 
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import DateD from "../components/date/date_day";
import DateM from "../components/date/date_month";
import { DateButton } from "@/components/button/dateButton";

const DatePage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); //初始值為當天日期

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl">行事曆</h1>
      </div>
      <div className="flex space-x-5 mt-3 mr-5 flex-1 overflow-hidden">
        <DateM selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <DateD selectedDate={selectedDate} />
      </div>
      <div className="">
        <DateButton/>
      </div>
    </div>
  );
};

export default DatePage;

  