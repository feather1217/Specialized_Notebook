"use client";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import DateD from "../components/date/date_day";
import DateM from "../components/date/date_month";
import { DateButton } from "@/components/button/dateButton";

const DatePage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); // 初始值為當天日期
  const [showDateD, setShowDateD] = useState(true); // 控制 DateD 的顯示

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth; // 當前視窗寬度
      const halfScreen = screen.width / 2; // 螢幕寬度一半
      // 當視窗小於螢幕一半或小於 768px 時隱藏 DateD
      setShowDateD(screenWidth >= halfScreen && screenWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl">行事曆</h1>
      </div>
      <div className="flex space-x-5 mt-3 mr-5 flex-1 overflow-hidden">
        {/* 根據 showDateD 動態調整 DateM 寬度 */}
        <DateM
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className={showDateD ? "w-3/4" : "w-full"} // 傳遞動態類別
        />
        {showDateD && <DateD selectedDate={selectedDate} />}
      </div>
      <div className="">
        <DateButton />
      </div>
    </div>
  );
};

export default DatePage;