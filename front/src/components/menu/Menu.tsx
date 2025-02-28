"use client";  // 標記為客戶端組件

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { List, CalendarDots, Notebook, FadersHorizontal, Gear, UsersThree, QuestionMark } from "@phosphor-icons/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const isLoggedIn = false;

// Menu 組件
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  // 切換開關狀態
  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex m-5">
      <Sheet open={isOpen} onOpenChange={toggleSheet}>

        <SheetTrigger asChild>
          <button><List size={32} /></button>
        </SheetTrigger>

        <SheetContent side="left" className="[&>button]:hidden">

          <SheetHeader className="sr-only">{/*為了規避錯誤*/}
            <SheetTitle>選單</SheetTitle>
          </SheetHeader>

          <div className=" flex h-40 w-full bg-[#A0D9D4] items-center px-5 space-x-2">
            <Avatar className=" size-15">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>載入失敗</AvatarFallback>
            </Avatar>
            <SheetHeader className="text-2xl font-bold">
              {/* 根據登入狀態顯示不同的內容 */}
              {isLoggedIn ? (
                <span>username</span>  // 用戶名可以從狀態或上下文中取得
              ) : (
                <Link onClick={() => setIsOpen(false)} href="/signin">未登入</Link> // 點擊後進入登入頁面
              )}
            </SheetHeader>
          </div>
          <nav className="grid m-5 gap-5">
            <Link href="/" onClick={() => setIsOpen(false)} className=" flex hover:text-[#548985] space-x-2 items-center">
              <CalendarDots size={32} weight="thin" />
              <span className="text-xl font-medium">行事曆</span>
            </Link>
            <Link href="/notes" onClick={() => setIsOpen(false)} className=" flex hover:text-[#548985] space-x-2 items-center">
              <Notebook size={32} weight="thin" />
              <span className="text-xl font-medium">記事本</span>
            </Link>
            <Link href="/timeline" onClick={() => setIsOpen(false)} className="flex hover:text-[#548985] space-x-2 items-center">
              <FadersHorizontal size={32} weight="thin" />
              <span className="text-xl font-medium">甘特圖</span>
            </Link>
            <Link href="/group" onClick={() => setIsOpen(false)} className="flex hover:text-[#548985] space-x-2 items-center">
              <UsersThree size={32} weight="thin" />
              <span className="text-xl font-medium">群組</span>
            </Link>
            <Link href="/set" onClick={() => setIsOpen(false)} className="flex hover:text-[#548985] space-x-2 items-center">
              <Gear size={32} weight="thin" />
              <span className="text-xl font-medium">設定</span>
            </Link>
            <Link href="/QA" onClick={() => setIsOpen(false)} className="flex hover:text-[#548985] space-x-2 items-center">
              <QuestionMark size={32} weight="thin" />
              <span className="text-xl font-medium">Q&A</span>
            </Link>

          </nav>
        </SheetContent>

      </Sheet>
    </div>
  );
}
