"use client";

import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

function DateD({ selectedDate }: { selectedDate: Dayjs }) {

    //selectedHour是選擇的小時，預設為null
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-1/4 rounded overflow-hidden mb-10">

      <div className="flex h-9 bg-[#b1dfdb] justify-center items-center pt-0.5 pb-0.5">
        <div className="font-bold text-xl ">{selectedDate.format("YYYY-MM-DD")}</div>
      </div>

      <div className="h-full overflow-y-auto border-t border-gray-300">
        <div className="flex flex-col">
          {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              onClick={() => setSelectedHour(hour)}
              className={`flex items-center ml-2  border-b border-gray-200 h-16 cursor-pointer ${
                selectedHour === hour ? "bg-[#b1dfdb] font-bold" : "bg-white"
              }`}
            >
              {hour.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DateD;
