"use client";
import { AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

export function AddDateForm() {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs()); // 儲存日期
  const [range, setRange] = useState<DateRange | undefined>(undefined); // 儲存日期範圍
  const [selectedHour, setSelectedHour] = useState<string>(""); // 儲存選擇的時間（小時）
  const [selectedMinute, setSelectedMinute] = useState<string>("00"); // 儲存選擇的時間（分鐘）
  const [isAllDay, setIsAllDay] = useState<boolean>(false); // 儲存是否選擇全天
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false); // 儲存彈出框狀態

  // 生成小時篩選器選項（00~23）
  const hoursOptions = Array.from({ length: 24 }, (_, hour) => {
    return dayjs().hour(hour).format("HH");
  });

  // 生成分鐘篩選器選項（00 和 30）
  const minutesOptions = ["00", "30"];

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);
  };

  const handleAllDayToggle = () => {
    setIsAllDay((prev) => !prev);
    setSelectedHour(""); // 清空小時選擇
    setSelectedMinute("00"); // 清空分鐘選擇
  };

  // 用來顯示選擇的日期範圍
  const formattedRange =
    range?.from && range?.to
      ? `${dayjs(range.from).format("MM/DD")} - ${dayjs(range.to).format("MM/DD")}`
      : range?.from
      ? dayjs(range.from).format("MM/DD")
      : "選擇日期範圍";

  return (
    <div>
      <form className="space-y-5 m-2">
        <div>
          <Input
            type="text"
            placeholder="標題"
            className="border-none shadow-none font-bold !text-xl"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between ">
            <span className="">全天</span>
            <Switch checked={isAllDay} onCheckedChange={handleAllDayToggle} />
          </div>

          {/* 日期範圍選擇器 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  " justify-start text-left font-normal",
                  !range && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {formattedRange}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* 時間篩選器 */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {selectedHour && selectedMinute
                  ? `${selectedHour}:${selectedMinute}`
                  : "選擇時間"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-4">
              <div className="flex space-x-2">
                {/* 小時選擇 */}
                <select
                  value={selectedHour}
                  onChange={(e) => handleHourChange(e.target.value)}
                  className={`w-1/2 p-2 border rounded ${
                    isAllDay ? "bg-gray-300 cursor-not-allowed" : ""
                  }`}
                  disabled={isAllDay}
                >
                  <option value="">小時</option>
                  {hoursOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                {/* 分鐘選擇 */}
                <select
                  value={selectedMinute}
                  onChange={(e) => handleMinuteChange(e.target.value)}
                  className={`w-1/2 p-2 border rounded ${
                    isAllDay ? "bg-gray-300 cursor-not-allowed" : ""
                  }`}
                  disabled={isAllDay}
                >
                  <option value="">分鐘</option>
                  {minutesOptions.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </form>

      <div className="flex justify-center">
        <AlertDialogFooter className="flex justify-center gap-4">
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction>確定</AlertDialogAction>
        </AlertDialogFooter>
      </div>
    </div>
  );
}
